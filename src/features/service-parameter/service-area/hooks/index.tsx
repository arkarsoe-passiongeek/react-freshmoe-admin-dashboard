import CButton from '@/components/custom/c-button';
import CLink from '@/components/custom/c-link';
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { queryClient } from '@/main';
import {
   deleteServiceArea,
   fetchServiceAreaList,
} from '@/services/actions/service-area';
import { DeleteServiceArea, ServiceArea } from '@/types';
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

// Define the return type for the useServiceArea hook
interface UseServiceAreaReturn {
   data: ServiceArea[] | undefined;
   isLoading: boolean;
   isDeleteModalOpen: boolean;
   setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   currentData: ServiceArea | null;
   setCurrentData: React.Dispatch<React.SetStateAction<ServiceArea | null>>;
   handleDeleteButtonClick: (data: ServiceArea) => void;
   getCreateButton: (src: string) => JSX.Element;
   handleDelete: () => Promise<void>;
   columns: ColumnDef<ServiceArea>[];
   deleteMutation: ReturnType<
      typeof useMutation<unknown, { message: string }, DeleteServiceArea>
   >;
   routes: ReturnType<typeof useLinkRoutes>;
   table: any; // Ideally, you should define the table type here if you have access to it
}

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<ServiceArea>;
   getEditButton: (id: string) => JSX.Element;
   getDeleteButton: (data: ServiceArea) => JSX.Element;
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

export const useServiceArea = (): UseServiceAreaReturn => {
   const routes = useLinkRoutes();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [currentData, setCurrentData] = useState<ServiceArea | null>(null);

   // Fetch Service Area List
   const { data, isLoading } = useQuery<ServiceArea[]>({
      queryKey: [API_ROUTES.serviceArea.getAll(), { parentId: null }],
      queryFn: () => fetchServiceAreaList({ parentId: 'null' }),
   });

   // Delete Service Area Mutation
   const deleteMutation = useMutation<
      unknown,
      { message: string },
      DeleteServiceArea
   >({
      mutationFn: deleteServiceArea,
      onError: () => {
         // Handle error if needed
      },
      onSuccess: () => {
         // Invalidate queries and refetch the data
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.serviceArea.getAll()],
         });
      },
   });

   const handleDeleteButtonClick = (data: ServiceArea) => {
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
         <CLink to={routes.serviceAreaCreate()} styleType='create'>
            Create {src}
         </CLink>
      );
   };

   const getEditButton = (id: string) => (
      <CLink size='xs' styleType='create' to={routes.serviceAreaEdit(id)}>
         Edit
      </CLink>
   );

   const getDeleteButton = (data: ServiceArea) => (
      <CButton
         size='xs'
         styleType='delete'
         onClick={() => handleDeleteButtonClick(data)}>
         Delete
      </CButton>
   );

   const getColumns = (
      getEditButton: (id: string) => JSX.Element,
      getDeleteButton: (data: ServiceArea) => JSX.Element
   ): ColumnDef<ServiceArea>[] => {
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
