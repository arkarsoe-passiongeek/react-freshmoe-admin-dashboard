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

interface DndDataTableProps<TData extends { id: UniqueIdentifier }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TTable<TData>;
  config: {
    data: TData[];
    setData: React.Dispatch<React.SetStateAction<TData[]>>;
    onDragEnd: (
      event: DragEndEvent,
      oldIndex: number,
      newIndex: number
    ) => void;
  };
}

export function DndDataTable<TData extends { id: UniqueIdentifier }, TValue>({
  columns,
  table,
  config,
}: Readonly<DndDataTableProps<TData, TValue>>) {

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => config.data?.map((data: TData) => data.id),
    [config.data]
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(event);
    if (active && over && active.id !== over.id) {
      config.setData((data: TData[]) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        config.onDragEnd(event, Number(oldIndex), Number(newIndex));
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
            <SortableContext
              items={dataIds}
              strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <DraggableRow key={row.id} row={row} />
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
    </div>
  );
}
