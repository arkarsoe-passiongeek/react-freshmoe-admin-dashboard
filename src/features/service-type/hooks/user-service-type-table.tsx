import Link from '@/components/common/link';
import CButton from '@/components/ui-custom/c-button';
import { paths } from '@/config/paths';
import { ListApiResponse, ServiceType } from '@/types';
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
import { useServiceTypes } from '../api/get-service-types';
import DeleteServiceType from '../components/delete-service-type';

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<ServiceType>;
   getEditButton: (_data: ServiceType) => JSX.Element;
}

const ActionButtons = ({ row, getEditButton }: ActionButtonsProps) => (
   <div className='flex gap-2'>
      {getEditButton(row.original)}
      <DeleteServiceType data={row.original} />
   </div>
);

// Define a custom hook for the table logic
export const useServiceTypeTable = (): {
   table: Table<ServiceType>;
   data: ServiceType[];
   setData: React.Dispatch<React.SetStateAction<ServiceType[]>>;
   serviceTypesQuery: UseQueryResult<ListApiResponse<ServiceType>, Error>;
   columns: ColumnDef<ServiceType>[];
} => {
   const serviceTypesQuery = useServiceTypes({});

   const serviceTypes = serviceTypesQuery.data?.data;

   const [data, setData] = useState<ServiceType[]>(serviceTypes ?? []);

   useEffect(() => {
      if (serviceTypesQuery.data?.data) {
         setData(serviceTypesQuery.data?.data);
      }
   }, [serviceTypesQuery.data?.data]);

   const getEditButton = (data: ServiceType): JSX.Element => (
      <CButton asChild size='xs'>
         <Link to={paths.serviceType.edit.getHref(String(data.id))}>Edit</Link>
      </CButton>
   );

   const RowDragHandleCell = ({ rowId }: { rowId: number }) => {
      const { attributes, listeners } = useSortable({
         id: rowId,
      });
      return (
         // Alternatively, you could set these attributes on the rows themselves
         <CButton {...attributes} {...listeners} size='xs'>
            <span className='material-symbols-outlined text-xl'>=</span>
         </CButton>
      );
   };

   // Define columns with appropriate types
   const columns: ColumnDef<ServiceType>[] = [
      {
         accessorKey: 'name',
         header: 'Name',
      },
      {
         accessorKey: 'code',
         header: 'Code',
      },
      {
         id: 'actions',
         header: 'Actions',
         cell: ({ row }) => {
            return <ActionButtons row={row} getEditButton={getEditButton} />;
         },
      },
   ];

   // Configure the table using useReactTable
   const table: Table<ServiceType> = useReactTable<ServiceType>({
      data: data ?? [],
      columns,
      getRowId: row => String(row.id),
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return {
      table,
      data,
      setData,
      serviceTypesQuery,
      columns,
   };
};
