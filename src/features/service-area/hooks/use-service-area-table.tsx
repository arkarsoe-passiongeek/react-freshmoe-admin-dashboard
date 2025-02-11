import Link from '@/components/common/link';
import CButton from '@/components/ui-custom/c-button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useEndPointServiceArea } from '../api/endpoint-service-area';
import { useServiceAreas } from '../api/get-service-areas';
import DeleteServiceArea from '../components/delete-service-area';

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<ServiceArea>;
   getEditButton: (_data: ServiceArea) => JSX.Element;
   handleServiceClick: (data: ServiceArea) => void;
}

const ActionButtons = ({
   row,
   getEditButton,
   handleServiceClick,
}: ActionButtonsProps) => (
   <div className='flex gap-2'>
      {getEditButton(row.original)}
      <DeleteServiceArea data={row.original} />
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <CButton
               variant='ghost'
               size='sm'
               className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
               <MoreHorizontal />
               <span className='sr-only'>Open menu</span>
            </CButton>
         </DropdownMenuTrigger>
         <DropdownMenuContent align='end' className='w-[160px]'>
            <DropdownMenuItem
               onClick={() => {
                  handleServiceClick(row.original);
               }}>
               Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   </div>
);

// Define a custom hook for the table logic
export const useServiceAreaTable = ({
   parentId,
   onServiceClick,
}: {
   parentId: string;
   onServiceClick: (data: ServiceArea) => void;
}): {
   currentData: ServiceArea | null;
   table: Table<ServiceArea>;
   serviceAreasQuery: UseQueryResult<ListApiResponse<ServiceArea>, Error>;
   columns: ColumnDef<ServiceArea>[];
} => {
   const [currentData, setCurrentData] = useState<ServiceArea | null>(null);
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
      endpointMutation.mutate({
         data: { status: value },
         serviceAreaId: String(data.id),
      });
   };

   const handleServiceClick = (data: ServiceArea) => {
      setCurrentData(data);
      onServiceClick(data);
   };

   const getEditButton = (data: ServiceArea): JSX.Element => (
      <CButton asChild size='xs'>
         <Link
            to={
               paths.serviceArea.edit.getHref(String(data.id)) +
               `?parentId=${data.parentId}`
            }>
            Edit
         </Link>
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
               return (
                  <Link
                     className='text-primary hover:underline'
                     to={{
                        pathname: paths.serviceArea.path,
                        search: `?parentId=${row.original.id}`,
                     }}>
                     {row.original.name}
                  </Link>
               );
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
            return (
               <ActionButtons
                  row={row}
                  getEditButton={getEditButton}
                  handleServiceClick={handleServiceClick}
               />
            );
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
      currentData,
      table,
      serviceAreasQuery,
      columns,
   };
};
