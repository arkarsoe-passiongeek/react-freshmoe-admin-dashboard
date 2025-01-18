import CLink from '@/components/custom/c-link';
import { Button } from '@/components/ui/button';
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { queryClient } from '@/main';
import { deleteLayer, fetchLayerList } from '@/services/actions/layer';
import { DeleteLayer, Layer } from '@/types';
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
import { MdDelete } from 'react-icons/md';
import { RiEditFill } from 'react-icons/ri';

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
         <CLink
            to={routes.layerCreate()}
            className='py-3 px-10 bg-c-primary rounded-xl text-base text-c-white hover:bg-c-hover capitalize'>
            Create {src}
         </CLink>
      );
   };

   const getEditButton = (id: string) => (
      <CLink to={routes.layerEdit(id)}>
         <Button tabIndex={-1} variant='ghost'>
            <RiEditFill className='text-blue-400 !w-[20px] !h-[20px]' />
         </Button>
      </CLink>
   );

   const getDeleteButton = (data: Layer) => (
      <Button variant='ghost' onClick={() => handleDeleteButtonClick(data)}>
         <MdDelete className='text-c-secondary !w-[20px] !h-[20px]' />
      </Button>
   );

   const getColumns = (
      getEditButton: (id: string) => JSX.Element,
      getDeleteButton: (data: Layer) => JSX.Element
   ): ColumnDef<Layer>[] => {
      return [
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
