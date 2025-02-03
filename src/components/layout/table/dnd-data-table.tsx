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
import {
   SortableContext,
   arrayMove,
   useSortable,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
   ColumnDef,
   Row,
   Table as TTable,
   flexRender,
} from '@tanstack/react-table';
import React, { CSSProperties } from 'react';

interface DndDataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   table: TTable<TData>;
   config: { data: TData[]; setData: (data: TData[]) => void };
}

export function DndDataTable<TData, TValue>({
   columns,
   table,
   config,
}: Readonly<DndDataTableProps<TData, TValue>>) {
   const dataIds = React.useMemo<UniqueIdentifier[]>(
      () => config.data?.map((data: TData) => data.id),
      [config.data]
   );

   function handleDragEnd(event: DragEndEvent) {
      console.log(event);
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
         config.setData((data: TData[]) => {
            const oldIndex = dataIds.indexOf(active.id);
            const newIndex = dataIds.indexOf(over.id);
            console.log(oldIndex, newIndex, data);
            return arrayMove(data, Number(oldIndex), Number(newIndex)); //this is just a splice util
         });
      }
   }

   const sensors = useSensors(
      useSensor(MouseSensor, {}),
      useSensor(TouchSensor, {}),
      useSensor(KeyboardSensor, {})
   );

   // Row Component
   const DraggableRow = ({ row }: { row: Row<TData> }) => {
      const { transform, transition, setNodeRef, isDragging } = useSortable({
         id: row.original.id,
      });

      const style: CSSProperties = {
         transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
         transition: transition,
         opacity: isDragging ? 0.8 : 1,
         zIndex: isDragging ? 1 : 0,
         position: 'relative',
      };

      return (
         // connect row ref to dnd-kit, apply important styles
         // <tr ref={setNodeRef} style={style}>
         //    {row.getVisibleCells().map(cell => (
         //       <td key={cell.id} style={{ width: cell.column.getSize() }}>
         //          {flexRender(cell.column.columnDef.cell, cell.getContext())}
         //       </td>
         //    ))}
         // </tr>
         <TableRow
            ref={setNodeRef}
            style={style}
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map(cell => (
               <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
               </TableCell>
            ))}
         </TableRow>
      );
   };

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
                  {JSON.stringify(dataIds)}
                  <SortableContext
                     items={dataIds}
                     strategy={verticalListSortingStrategy}>
                     {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                           <DraggableRow key={row.id} row={row} />
                           // <TableRow
                           //    key={row.id}
                           //    data-state={row.getIsSelected() && 'selected'}>
                           //    {row.getVisibleCells().map(cell => (
                           //       <TableCell key={cell.id}>
                           //          {flexRender(
                           //             cell.column.columnDef.cell,
                           //             cell.getContext()
                           //          )}
                           //       </TableCell>
                           //    ))}
                           // </TableRow>
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
                  </SortableContext>
               </TableBody>
            </Table>
         </DndContext>
         <pre>{JSON.stringify(config.data, null, 2)}</pre>
      </div>
   );
}
