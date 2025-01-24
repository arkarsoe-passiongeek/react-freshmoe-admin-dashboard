import ListEmpty from '@/assets/images/list-empty.png';
import CInput from '@/components/custom/c-input';
import DeleteConfirmDialog from '@/components/layout/dialogs/delete-confirm-dialog';
import Loading from '@/components/layout/loading';
import { DataTable } from '@/components/layout/table/data-table';
import { DataTablePagination } from '@/components/layout/table/data-table-pagination';
import { Button } from '@/components/ui/button';
import { Layer } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useLayer } from '../hooks';

const LayerTable: React.FC = () => {
   const {
      data,
      isLoading,
      isDeleteModalOpen,
      setIsDeleteModalOpen,
      columns,
      currentData,
      getCreateButton,
      handleDelete,
      deleteMutation,
      table,
   } = useLayer();

   const src = 'layer';

   const isFiltered =
      table
         .getState()
         .columnFilters.filter((each: ColumnDef<Layer>) => each.id === 'name')
         .length > 0;

   return (
      <div>
         <div>
            <div className='flex items-center justify-between mb-4'>
               <div className='flex items-center'>
                  <CInput.SearchInput
                     placeholder='Search...'
                     value={
                        (table.getColumn('name')?.getFilterValue() as string) ??
                        ''
                     }
                     onChange={event =>
                        table
                           .getColumn('name')
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
            <div className='mb-2'>
               {isLoading && (
                  <div className='p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-xl'>
                     <Loading />
                  </div>
               )}
               {!isLoading && data && (
                  <>
                     <div className={`${data.length <= 0 && 'hidden'}`}>
                        <DataTable columns={columns} table={table} />
                     </div>
                     <div
                        className={`p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-xl ${
                           data && data.length > 0 && 'hidden'
                        }`}>
                        <img
                           src={ListEmpty}
                           width={135}
                           height={160}
                           alt='logo'
                        />
                        <h3 className='font-semibold text-2xl text-c-border-stroke'>
                           Your {src} List is empty
                        </h3>
                     </div>
                  </>
               )}
            </div>
            {data && data.length > 0 && <DataTablePagination table={table} />}
            <DeleteConfirmDialog
               src={src}
               data={currentData}
               isDeleteModalOpen={isDeleteModalOpen}
               isDeleting={deleteMutation.isPending}
               setIsDeleteModalOpen={setIsDeleteModalOpen}
               handleDelete={handleDelete}
            />
         </div>
      </div>
   );
};

export default LayerTable;
