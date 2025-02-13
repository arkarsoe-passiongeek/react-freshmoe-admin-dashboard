import ListEmpty from '@/assets/media/images/list-empty.png';
import Link from '@/components/common/link';
import { DataTablePagination } from '@/components/common/table/data-table-pagination';
import { DndDataTable } from '@/components/common/table/dnd-data-table';
import Loading from '@/components/layouts/loading';
import CButton from '@/components/ui-custom/c-button';
import CInput from '@/components/ui-custom/c-input/c-input';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { DragEndEvent } from '@dnd-kit/core';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useReorderLayer } from '../api/reorder-layer';
import { useLayerTable } from '../hooks/use-layer-table';

const LayerTable = () => {
   const src = 'layer';
   const { table, data, setData, columns, layersQuery } = useLayerTable();
   const navigate = useNavigate();
   const { addNotification } = useNotifications();

   const getCreateButton = (): JSX.Element => (
      <CButton asChild size='md'>
         <Link to={paths.layer.create.path}>Create</Link>
      </CButton>
   );

   const isFiltered =
      table.getState().columnFilters.filter(each => each.id === 'name').length >
      0;

   const layers = layersQuery.data?.data;

   const reorderLayerMutation = useReorderLayer({
      mutationConfig: {
         onError: _error => {
            console.log(_error);
         },
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'Reorder Updated',
            });
            navigate(paths.layer.path);
         },
      },
   });

   const onDragEnd = (
      _event: DragEndEvent,
      oldIndex: number,
      newIndex: number,
   ) => {
      reorderLayerMutation.mutate({
         data: { orderIndex: String(newIndex) },
         layerId: String(oldIndex + 1),
      });
   };

   const { isError } = layersQuery;

   if (isError) {
      return (
         <div className='w-full h-full flex justify-center items-center text-destructive'>
            There is a error!
         </div>
      );
   }

   const isLayerExist = () => {
      return layers && layers.length > 0;
   };

   return (
      <div className='flex flex-col justify-between h-full'>
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
                     className='h-[48px] w-[150px] lg:w-[250px] xl:w-[380px]'
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
                  {getCreateButton()}
               </div>
            </div>
            <div className='mb-2'>
               {layersQuery.isLoading && <Loading />}
               {layersQuery.isSuccess && (
                  <>
                     {isLayerExist() && (
                        // <DataTable columns={columns} table={table} />
                        <DndDataTable
                           config={{ data, setData, onDragEnd }}
                           columns={columns}
                           table={table}
                        />
                     )}
                     {!isLayerExist() && (
                        <div
                           className={`p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-xl`}>
                           <img
                              src={ListEmpty}
                              width={135}
                              height={160}
                              alt='logo'
                           />
                           <h3 className='font-semibold text-2xl text-c-border-stroke capitalize'>
                              {src} List is empty
                           </h3>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
         {layers && layers.length > 0 && <DataTablePagination table={table} />}
      </div>
   );
};

export default LayerTable;
