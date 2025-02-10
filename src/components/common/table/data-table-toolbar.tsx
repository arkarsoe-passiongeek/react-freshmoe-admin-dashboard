import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import CInput from '@/components/custom/c-input';
import { DataTableViewOptions } from '@/components/layout/table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Config } from './types';

interface DataTableToolbarProps<TData> {
   table: Table<TData>;
   config: Config;
}

export function DataTableToolbar<TData>({
   table,
   config,
}: Readonly<DataTableToolbarProps<TData>>) {
   const isFiltered = table.getState().columnFilters.length > 0;

   return (
      <div className='flex items-center justify-between'>
         <div className='flex flex-1 items-center space-x-2'>
            {/* <Input
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
            <CInput.SearchInput
               placeholder='Search...'
               value={
                  (table.getColumn('name')?.getFilterValue() as string) ?? ''
               }
               onChange={event =>
                  table.getColumn('name')?.setFilterValue(event.target.value)
               }
               className='w-[150px] lg:w-[250px] xl:w-[380px]'
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
         {config.toolbar?.viewOptions && <DataTableViewOptions table={table} />}
      </div>
   );
}
