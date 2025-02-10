import Link from '@/components/common/link';
import CButton from '@/components/ui-custom/c-button';
import { paths } from '@/config/paths';
import { Layer, ListApiResponse } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { UseQueryResult } from '@tanstack/react-query';
import {
   ColumnDef,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   Row,
   Table,
   useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useLayers } from '../api/get-layers';
import DeleteLayer from '../components/delete-layer';

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<Layer>;
   getEditButton: (_data: Layer) => JSX.Element;
}

const ActionButtons = ({
   row,
   getEditButton,
}: ActionButtonsProps) => (
   <div className='flex gap-2'>
      {getEditButton(row.original)}
      <DeleteLayer data={row.original} />
   </div>
);

// Define a custom hook for the table logic
export const useLayerTable = (): {
   table: Table<Layer>;
   data: Layer[];
   setData: React.Dispatch<React.SetStateAction<Layer[]>>;
   layersQuery: UseQueryResult<ListApiResponse<Layer>, Error>;
   columns: ColumnDef<Layer>[];
} => {
   const layersQuery = useLayers({});

   const layers = layersQuery.data?.data;

   const [data, setData] = useState<Layer[]>(layers ?? []);

   useEffect(() => {
      if (layersQuery.data?.data) {
         setData(layersQuery.data?.data);
      }
   }, [layersQuery.data?.data]);

   const getEditButton = (data: Layer): JSX.Element => (
      <CButton asChild size='xs'>
         <Link to={paths.layer.edit.getHref(data.id)}>Edit</Link>
      </CButton>
   );

   const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
      const { attributes, listeners } = useSortable({
         id: rowId,
      });
      return (
         // Alternatively, you could set these attributes on the rows themselves
         <CButton {...attributes} {...listeners}>
            🟰
         </CButton>
      );
   };

   // Define columns with appropriate types
   const columns: ColumnDef<Layer>[] = [
      {
         id: 'drag-handle',
         header: 'Move',
         cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
         size: 60,
      },
      {
         accessorKey: 'name',
         header: 'Name',
      },
      {
         id: 'actions',
         header: 'Actions',
         cell: ({ row }) => {
            return (
               <ActionButtons
                  row={row}
                  getEditButton={getEditButton}
               />
            );
         },
      },
   ];

   // Configure the table using useReactTable
   const table: Table<Layer> = useReactTable<Layer>({
      data: data ?? [],
      columns,
      getRowId: row => row.id,
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return {
      table,
      data,
      setData,
      layersQuery,
      columns,
   };
};
