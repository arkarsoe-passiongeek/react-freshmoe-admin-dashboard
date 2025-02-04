import CButton from '@/components/custom/c-button';
import CLink from '@/components/custom/c-link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import useSearchParams from '@/hooks/use-search-params';
import { Link } from '@/i18n/routing';
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { queryClient } from '@/main';
import {
   deleteServiceArea,
   endpointServiceArea,
   fetchServiceAreaList,
} from '@/services/actions/service-area';
import { DeleteServiceArea, EndpointServiceArea, ServiceArea } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
   ColumnDef,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   Row,
   useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

// Define the return type for the useServiceArea hook
interface UseServiceAreaReturn {
   data: ServiceArea[] | undefined;
   isLoading: boolean;
   isDeleteModalOpen: boolean;
   setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   currentData: ServiceArea | null;
   setCurrentData: React.Dispatch<React.SetStateAction<ServiceArea | null>>;
   handleDeleteButtonClick: (data: ServiceArea) => void;
   getCreateButton: (src: string) => JSX.Element;
   handleDelete: () => Promise<void>;
   columns: ColumnDef<ServiceArea>[];
   deleteMutation: ReturnType<
      typeof useMutation<unknown, { message: string }, DeleteServiceArea>
   >;
   routes: ReturnType<typeof useLinkRoutes>;
   table: any; // Ideally, you should define the table type here if you have access to it
}

// Action buttons component with types
interface ActionButtonsProps {
   row: Row<ServiceArea>;
   getEditButton: (id: string) => JSX.Element;
   getDeleteButton: (data: ServiceArea) => JSX.Element;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
   row,
   getEditButton,
   getDeleteButton,
}) => (
   <div className='flex gap-2 items-center'>
      {getEditButton(String(row.original.id))}
      {getDeleteButton(row.original)}
   </div>
);

export const useServiceArea = (): UseServiceAreaReturn => {
   const routes = useLinkRoutes();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [currentData, setCurrentData] = useState<ServiceArea | null>(null);
   const searchParam = useSearchParams();

   // Fetch Service Area List
   const { data, isLoading } = useQuery<ServiceArea[]>({
      queryKey: [
         API_ROUTES.serviceArea.getAll(),
         { parentId: searchParam.get('parentId') ?? null },
      ],
      queryFn: () =>
         fetchServiceAreaList({
            parentId: searchParam.get('parentId') ?? null,
         }),
   });

   // Delete Service Area Mutation
   const endpointMutation = useMutation<
      unknown,
      { message: string },
      EndpointServiceArea
   >({
      mutationFn: values => endpointServiceArea(values, values.id),
      onError: () => {
         // Handle error if needed
      },
      onSuccess: () => {
         // Invalidate queries and refetch the data
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.serviceArea.getAll()],
         });
      },
   });

   // Delete Service Area Mutation
   const deleteMutation = useMutation<
      unknown,
      { message: string },
      DeleteServiceArea
   >({
      mutationFn: deleteServiceArea,
      onError: () => {
         // Handle error if needed
      },
      onSuccess: () => {
         // Invalidate queries and refetch the data
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.serviceArea.getAll()],
         });
      },
   });

   const handleDeleteButtonClick = (data: ServiceArea) => {
      setCurrentData(data);
      setIsDeleteModalOpen(true);
   };

   const handleMakeEndpoint = (data: ServiceArea, value: boolean) => {
      endpointMutation.mutate({ status: value, id: data.id });
   };

   const handleDelete = async () => {
      try {
         if (currentData) {
            await deleteMutation.mutateAsync({ id: currentData.id });
         }
      } finally {
         setIsDeleteModalOpen(false);
      }
   };

   const getCreateButton = (src: string): JSX.Element => {
      return (
         <CLink
            to={{
               pathname: routes.serviceAreaCreate(),
               search: `?parentId=${searchParam.get('parentId')}`,
            }}
            styleType='create'>
            Create
         </CLink>
      );
   };

   const getEditButton = (id: string) => (
      <CLink
         size='xs'
         styleType='create'
         to={{
            pathname: routes.serviceAreaEdit(id),
            search: `?parentId=${searchParam.get('parentId')}`,
         }}>
         Edit
      </CLink>
   );

   const getDeleteButton = (data: ServiceArea) => (
      <CButton
         size='xs'
         styleType='delete'
         onClick={() => handleDeleteButtonClick(data)}>
         Delete
      </CButton>
   );

   const getSwitch = (data: ServiceArea) => {
      return (
         <Switch
            // title='Switch to set as final child'
            defaultChecked={data.endPoint}
            id={'switch'}
            onCheckedChange={value => handleMakeEndpoint(data, value)}
            className='h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3'
         />
      );
   };

   const getColumns = (
      getEditButton: (id: string) => JSX.Element,
      getDeleteButton: (data: ServiceArea) => JSX.Element,
      getSwitch: (data: ServiceArea) => JSX.Element
   ): ColumnDef<ServiceArea>[] => {
      return [
         {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
               return (
                  <Button variant='link' className='px-0' asChild>
                     <Link
                        className=''
                        to={{
                           pathname: routes.serviceArea(),
                           search: `?parentId=${row.original.id}`,
                        }}>
                        {row.original.name}
                     </Link>
                  </Button>
               );
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
            cell: ({ row }) => (
               <ActionButtons
                  row={row}
                  getEditButton={getEditButton}
                  getDeleteButton={getDeleteButton}
               />
            ),
         },
      ];
   };

   const columns = getColumns(getEditButton, getDeleteButton, getSwitch);

   const table = useReactTable<any>({
      data: data ?? [],
      columns,
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return {
      data,
      isLoading,
      isDeleteModalOpen,
      setIsDeleteModalOpen,
      currentData,
      columns,
      setCurrentData,
      handleDeleteButtonClick,
      handleDelete,
      deleteMutation,
      getCreateButton,
      routes,
      table,
   };
};
