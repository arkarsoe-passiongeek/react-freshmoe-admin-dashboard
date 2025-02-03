import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { ColumnDef, Table as TTable, flexRender } from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   table: TTable<TData>;
}

export function DataTable<TData, TValue>({
   columns,
   table,
}: Readonly<DataTableProps<TData, TValue>>) {
   return (
      <div className='rounded-xl p-2 bg-c-white'>
         <Table>
            <TableHeader className='bg-primary'>
               {table.getHeaderGroups().map(headerGroup => (
                  <TableRow
                     className='first:[&_th]:rounded-l-lg last:[&_th]:rounded-r-lg hover:bg-primary'
                     key={headerGroup.id}>
                     {headerGroup.headers.map(header => {
                        return (
                           <TableHead
                              className='text-c-white px-4'
                              key={header.id}
                              colSpan={header.colSpan}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </TableHead>
                        );
                     })}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map(cell => (
                           <TableCell key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell
                        colSpan={columns.length}
                        className='h-24 text-center'>
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   );
}
