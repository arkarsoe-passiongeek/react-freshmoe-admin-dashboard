import ListEmpty from '@/assets/media/images/list-empty.png';
import Link from '@/components/common/link';
import { DataTable } from '@/components/common/table/data-table';
import { DataTablePagination } from '@/components/common/table/data-table-pagination';
import Loading from '@/components/layouts/loading';
import CButton from '@/components/ui-custom/c-button';
import CInput from '@/components/ui-custom/c-input/c-input';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { X } from 'lucide-react';
import { useServiceTypeTable } from '../hooks/user-service-type-table';

const ServiceTypeTable = () => {
   const src = 'serviceType';
   const { table, data, setData, columns, serviceTypesQuery } =
      useServiceTypeTable();

   const getCreateButton = (): JSX.Element => (
      <CButton asChild size='md'>
         <Link to={paths.serviceType.create.path}>Create</Link>
      </CButton>
   );

   const isFiltered =
      table.getState().columnFilters.filter(each => each.id === 'name').length >
      0;

   const serviceTypes = serviceTypesQuery.data?.data;

   const { isError } = serviceTypesQuery;

   if (isError) {
      return (
         <div className='w-full h-full flex justify-center items-center text-destructive'>
            There is a error!
         </div>
      );
   }

   const isServiceTypeExist = () => {
      return serviceTypes && serviceTypes.length > 0;
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
               {serviceTypesQuery.isLoading && <Loading />}
               {serviceTypesQuery.isSuccess && (
                  <>
                     {isServiceTypeExist() && (
                        // <DataTable columns={columns} table={table} />
                        <DataTable columns={columns} table={table} />
                     )}
                     {!isServiceTypeExist() && (
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
         {serviceTypes && serviceTypes.length > 0 && (
            <DataTablePagination table={table} />
         )}
      </div>
   );
};

export default ServiceTypeTable;
