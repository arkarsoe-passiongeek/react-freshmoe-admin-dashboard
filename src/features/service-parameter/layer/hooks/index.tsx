import CButton from '@/components/custom/c-button';
import CLink from '@/components/custom/c-link';
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { queryClient } from '@/main';
import { deleteLayer, fetchLayerList } from '@/services/actions/layer';
import { DeleteLayer, Layer } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
   ColumnDef,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   Row,
   useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

// Define the return type for the useLayer hook
interface UseLayerReturn {
   data: Layer[] | undefined;
   isLoading: boolean;
   isDeleteModalOpen: boolean;
   setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   currentData: Layer | null;
   setCurrentData: React.Dispatch<React.SetStateAction<Layer | null>>;
   handleDeleteButtonClick: (data: Layer) => void;
   getCreateButton: (src: string) => JSX.Element;
   handleDelete: () => Promise<void>;
   columns: ColumnDef<Layer>[];
   deleteMutation: ReturnType<
      typeof useMutation<unknown, { message: string }, DeleteLayer>
   >;
   routes: ReturnType<typeof useLinkRoutes>;
   table: any; // Ideally, you should define the table type here if you have access to it
}

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<Layer>;
   getEditButton: (id: string) => JSX.Element;
   getDeleteButton: (data: Layer) => JSX.Element;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
   row,
   getEditButton,
   getDeleteButton,
}) => (
   <div className='flex gap-2'>
      {getEditButton(String(row.original.id))}
      {getDeleteButton(row.original)}
   </div>
);

export const useLayer = (): UseLayerReturn => {
   const routes = useLinkRoutes();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [currentData, setCurrentData] = useState<Layer | null>(null);

   // Fetch Layer List
   const { data, isLoading } = useQuery<Layer[]>({
      queryKey: [API_ROUTES.layer.getAll()],
      queryFn: fetchLayerList,
   });

   // Delete Layer Mutation
   const deleteMutation = useMutation<
      unknown,
      { message: string },
      DeleteLayer
   >({
      mutationFn: deleteLayer,
      onError: () => {
         // Handle error if needed
      },
      onSuccess: () => {
         // Invalidate queries and refetch the data
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.layer.getAll()],
         });
      },
   });

   const handleDeleteButtonClick = (data: Layer) => {
      setCurrentData(data);
      setIsDeleteModalOpen(true);
   };

   const handleDelete = async () => {
      try {
         if (currentData) {
            await deleteMutation.mutateAsync({ id: currentData.id });
         }
      } finally {
         setIsDeleteModalOpen(false);
      }
   };

   const getCreateButton = (src: string): JSX.Element => {
      return (
         <CLink to={routes.layerCreate()} styleType='create'>
            Create
         </CLink>
      );
   };

   const getEditButton = (id: string) => (
      <CLink size='xs' styleType='create' to={routes.layerEdit(id)}>
         Edit
      </CLink>
   );

   const getDeleteButton = (data: Layer) => (
      <CButton
         size='xs'
         styleType='delete'
         onClick={() => handleDeleteButtonClick(data)}>
         Delete
      </CButton>
   );

   const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
      const { attributes, listeners } = useSortable({
         id: rowId,
      });
      return (
         // Alternatively, you could set these attributes on the rows themselves
         <CButton {...attributes} {...listeners}>
            🟰
         </CButton>
      );
   };

   const getColumns = (
      getEditButton: (id: string) => JSX.Element,
      getDeleteButton: (data: Layer) => JSX.Element
   ): ColumnDef<Layer>[] => {
      return [
         {
            id: 'drag-handle',
            header: 'Move',
            cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
            size: 60,
         },
         {
            accessorKey: 'name',
            header: 'Name',
         },
         {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
               <ActionButtons
                  row={row}
                  getEditButton={getEditButton}
                  getDeleteButton={getDeleteButton}
               />
            ),
         },
      ];
   };

   const columns = getColumns(getEditButton, getDeleteButton);

   const table = useReactTable<any>({
      data: data ?? [],
      columns,
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return {
      data,
      isLoading,
      isDeleteModalOpen,
      setIsDeleteModalOpen,
      currentData,
      columns,
      setCurrentData,
      handleDeleteButtonClick,
      handleDelete,
      deleteMutation,
      getCreateButton,
      routes,
      table,
   };
};
