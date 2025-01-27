import ListEmpty from '@/assets/images/list-empty.png';
import CInput from '@/components/custom/c-input';
import DeleteConfirmDialog from '@/components/layout/dialogs/delete-confirm-dialog';
import CreateDrawer from '@/components/layout/drawers/create-drawer';
import Loading from '@/components/layout/loading';
import { DataTable } from '@/components/layout/table/data-table';
import { DataTablePagination } from '@/components/layout/table/data-table-pagination';
import { Button } from '@/components/ui/button';
import useSearchParams from '@/hooks/use-search-params';
import { Layer } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useContent } from '../hooks';
import ContentCreateForm from './content-create-form';

const ContentTable: React.FC = () => {
   const src = 'content';
   const searchParams = useSearchParams();

   const {
      columns,
      getCreateButton,
      currentData,
      isDeleteModalOpen,
      deleteMutation,
      setIsDeleteModalOpen,
      handleDelete,
      table,
      contentsQuery,
      createDrawerOpen,
      setCreateDrawerOpen,
   } = useContent({ searchParams });

   if (contentsQuery.isLoading) {
      return (
         <div className='flex h-48 w-full items-center justify-center'>
            <Loading />
         </div>
      );
   }

   const contents = contentsQuery.data?.data;

   console.log(contents);

   if (!contents) return null;

   const isFiltered =
      table
         .getState()
         .columnFilters.filter((each: ColumnDef<Layer>) => each.id === 'title')
         .length > 0;

   return (
      <div>
         <div>
            <div className='flex items-center justify-between mb-4'>
               <div className='flex items-center'>
                  <CInput.SearchInput
                     placeholder='Search...'
                     value={
                        (table
                           .getColumn('title')
                           ?.getFilterValue() as string) ?? ''
                     }
                     onChange={event =>
                        table
                           .getColumn('title')
                           ?.setFilterValue(event.target.value)
                     }
                     className='h-[50px] w-[150px] lg:w-[250px] xl:w-[380px]'
                  />
                  {isFiltered && (
                     <Button
                        variant='ghost'
                        onClick={() => table.resetColumnFilters()}
                        className='h-8 px-2 lg:px-3'>
                        Reset
                        <X />
                     </Button>
                  )}
               </div>
               <div className='flex items-center gap-3 shrink-0'>
                  {getCreateButton(src)}
               </div>
            </div>
            {contents.length > 0 && (
               <div className='mb-4'>
                  <DataTable columns={columns} table={table} />
               </div>
            )}
            {contents.length <= 0 && (
               <div
                  className={`p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-xl`}>
                  <img src={ListEmpty} width={135} height={160} alt='logo' />
                  <h3 className='font-semibold text-2xl text-c-border-stroke'>
                     Your {src} List is empty
                  </h3>
               </div>
            )}
         </div>
         {contents.length > 0 && <DataTablePagination table={table} />}
         <DeleteConfirmDialog
            src={src}
            data={currentData}
            isDeleteModalOpen={isDeleteModalOpen}
            isDeleting={deleteMutation.isPending}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            handleDelete={handleDelete}
         />
         <CreateDrawer
            title='Create'
            open={createDrawerOpen}
            setOpen={setCreateDrawerOpen}>
            <ContentCreateForm
               onCreateSuccess={() => {
                  setCreateDrawerOpen(false);
               }}
            />
         </CreateDrawer>
      </div>
   );
};

export default ContentTable;
