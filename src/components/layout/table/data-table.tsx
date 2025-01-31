import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   DndContext,
   KeyboardSensor,
   MouseSensor,
   TouchSensor,
   closestCenter,
   useSensor,
   useSensors,
   type DragEndEvent,
   type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { ColumnDef, Table as TTable, flexRender } from '@tanstack/react-table';
import React from 'react';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   table: TTable<TData>;
}

export function DataTable<TData, TValue>({
   columns,
   table,
}: Readonly<DataTableProps<TData, TValue>>) {
   const [data, setData] = React.useState();

   const dataIds = React.useMemo<UniqueIdentifier[]>(
      () => data?.map(({ userId }) => userId),
      [data]
   );

   function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
         setData(data => {
            const oldIndex = dataIds.indexOf(active.id);
            const newIndex = dataIds.indexOf(over.id);
            return arrayMove(data, oldIndex, newIndex); //this is just a splice util
         });
      }
   }

   const sensors = useSensors(
      useSensor(MouseSensor, {}),
      useSensor(TouchSensor, {}),
      useSensor(KeyboardSensor, {})
   );

   return (
      <div className='rounded-xl p-2 bg-c-white'>
         <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}>
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
         </DndContext>
      </div>
   );
}
