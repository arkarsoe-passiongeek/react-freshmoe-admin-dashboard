import Link from '@/components/common/link';
import CButton from '@/components/ui-custom/c-button';
import { useNotifications } from '@/components/ui/notifications';
import { Switch } from '@/components/ui/switch';
import { paths } from '@/config/paths';
import { ListApiResponse, ServiceArea } from '@/types';
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
import { useEndPointServiceArea } from '../api/endpoint-service-area';
import { useServiceAreas } from '../api/get-service-areas';
import DeleteServiceArea from '../components/delete-service-area';

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<ServiceArea>;
   getEditButton: (_data: ServiceArea) => JSX.Element;
}

const ActionButtons = ({ row, getEditButton }: ActionButtonsProps) => (
   <div className='flex gap-2'>
      {getEditButton(row.original)}
      <DeleteServiceArea data={row.original} />
   </div>
);

// Define a custom hook for the table logic
export const useServiceAreaTable = ({
   parentId,
}: {
   parentId: string;
}): {
   table: Table<ServiceArea>;
   serviceAreasQuery: UseQueryResult<ListApiResponse<ServiceArea>, Error>;
   columns: ColumnDef<ServiceArea>[];
} => {
   const serviceAreasQuery = useServiceAreas({ parentId });
   const { addNotification } = useNotifications();

   const endpointMutation = useEndPointServiceArea({
      parentId,
      mutationConfig: {
         onError: _error => {
            addNotification({
               type: 'error',
               title: 'Make Endpoint Failed',
            });
         },
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'Make Endpoint Updated',
            });
         },
      },
   });

   const handleMakeEndpoint = (data: ServiceArea, value: boolean) => {
      endpointMutation.mutate({ data: { status: value }, serviceAreaId: String(data.id) });
   };

   const getEditButton = (data: ServiceArea): JSX.Element => (
      <CButton asChild size='xs'>
         <Link to={paths.serviceArea.edit.getHref(String(data.id)) + `?parentId=${data.parentId}`}>Edit</Link>
      </CButton>
   );

   const getSwitch = (data: ServiceArea) => {
      return (
         <Switch
            // title='Switch to set as final child'
            disabled={endpointMutation.isPending}
            defaultChecked={data.endPoint}
            checked={data.endPoint}
            id={'switch'}
            onCheckedChange={value => handleMakeEndpoint(data, value)}
            className='h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3'
         />
      );
   };

   // Define columns with appropriate types
   const columns: ColumnDef<ServiceArea>[] = [
      {
         accessorKey: 'name',
         header: 'Name',
         cell: ({ row }) => {
            if (!row.original.endPoint) {
               return <Link
                  className='text-primary hover:underline'
                  to={{
                     pathname: paths.serviceArea.path,
                     search: `?parentId=${row.original.id}`,
                  }}>
                  {row.original.name}
               </Link>;
            } else {
               return <span className='text-c-black'>{row.original.name}</span>;
            }
         },
      },
      {
         accessorKey: 'status',
         header: 'Status',
         cell: ({ row }) => {
            return <>{getSwitch(row.original)}</>;
         },
      },
      {
         accessorKey: 'service-layer',
         header: 'Layer',
         cell: ({ row }) => {
            return <span>{row.original?.serviceLayer?.name}</span>;
         },
      },
      {
         id: 'actions',
         header: 'Actions',
         cell: ({ row }) => {
            console.log(row);
            return <ActionButtons row={row} getEditButton={getEditButton} />;
         },
      },
   ];

   // Configure the table using useReactTable
   const table: Table<ServiceArea> = useReactTable<ServiceArea>({
      data: serviceAreasQuery?.data?.data ?? [],
      columns,
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return {
      table,
      serviceAreasQuery,
      columns,
   };
};
