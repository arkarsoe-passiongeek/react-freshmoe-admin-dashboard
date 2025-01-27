import CButton from '@/components/custom/c-button';
import { useLinkRoutes } from '@/lib/route';
import { queryClient } from '@/main';
import { Content, DeleteContent } from '@/types';
import { useMutation } from '@tanstack/react-query';
import {
   ColumnDef,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   Row,
   useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useContents } from '../api';
import { deleteContent } from '../api/delete-content';

// Define the return type for the useLayer hook
interface UseContentReturn {
   isDeleteModalOpen: boolean;
   setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   createDrawerOpen: boolean;
   setCreateDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
   viewDrawerOpen: boolean;
   setViewDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
   currentData: Content | null;
   setCurrentData: React.Dispatch<React.SetStateAction<Content | null>>;
   handleDeleteButtonClick: (data: Content) => void;
   getCreateButton: (src: string) => JSX.Element;
   handleDelete: () => Promise<void>;
   columns: ColumnDef<Content>[];
   deleteMutation: ReturnType<
      typeof useMutation<unknown, { message: string }, DeleteContent>
   >;
   routes: ReturnType<typeof useLinkRoutes>;
   table: any;
   contentsQuery: any;
}

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<Content>;
   getEditButton: (data: Content) => JSX.Element;
   getDeleteButton: (data: Content) => JSX.Element;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
   row,
   getEditButton,
   getDeleteButton,
}) => (
   <div className='flex gap-2'>
      {getEditButton(row.original)}
      {getDeleteButton(row.original)}
   </div>
);

export const useContent = ({ searchParams }): UseContentReturn => {
   const routes = useLinkRoutes();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
   const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
   const [currentData, setCurrentData] = useState<Content | null>(null);

   const contentsQuery = useContents({
      page: searchParams.get('page') || 'home',
      section: searchParams.get('section') || '1',
   });

   // Delete Content Mutation
   const deleteMutation = useMutation<
      unknown,
      { message: string },
      DeleteContent
   >({
      mutationFn: deleteContent, // Update if there's a different delete function for Content
      onError: () => {
         // Handle error if needed
      },
      onSuccess: () => {
         // Invalidate queries and refetch the data
         queryClient.invalidateQueries({
            queryKey: [],
         });
      },
   });

   const handleDeleteButtonClick = (data: Content) => {
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

   const getCreateButton = (src: string): JSX.Element => (
      <CButton
         size='md'
         onClick={() => setCreateDrawerOpen(true)}
         styleType='create'>
         Create
      </CButton>
   );

   const getEditButton = (data: Content) => (
      <CButton
         size='xs'
         onClick={() => {
            setCurrentData(data);
            setViewDrawerOpen(true);
         }}
         styleType='create'>
         Detail
      </CButton>
   );

   const getDeleteButton = (data: Content) => (
      <CButton
         size='xs'
         styleType='delete'
         onClick={() => handleDeleteButtonClick(data)}>
         Delete
      </CButton>
   );

   const getColumns = (
      getEditButton: (id: string) => JSX.Element,
      getDeleteButton: (data: Content) => JSX.Element
   ): ColumnDef<Content>[] => {
      return [
         {
            accessorKey: 'title',
            header: 'Title',
         },
         {
            accessorKey: 'description',
            header: 'Description',
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
      data: contentsQuery.data?.data ?? [],
      columns,
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return {
      createDrawerOpen,
      setCreateDrawerOpen,
      isDeleteModalOpen,
      setIsDeleteModalOpen,
      viewDrawerOpen,
      setViewDrawerOpen,
      currentData,
      columns,
      setCurrentData,
      handleDeleteButtonClick,
      handleDelete,
      deleteMutation,
      getCreateButton,
      routes,
      table,
      contentsQuery,
   };
};
