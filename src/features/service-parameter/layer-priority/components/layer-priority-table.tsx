import ListEmpty from '@/assets/images/list-empty.png';
import CInput from '@/components/custom/c-input';
import CLink from '@/components/custom/c-link';
import DeleteConfirmDialog from '@/components/layout/dialogs/delete-confirm-dialog';
import Loading from '@/components/layout/loading';
import { DataTablePagination } from '@/components/layout/table/data-table-pagination';
import { PureDataTable } from '@/components/layout/table/pure-data-table';
import { Button } from '@/components/ui/button';
import useSearchParams from '@/hooks/use-search-params';
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { getNextLayer, getSlug, isLastLayer } from '@/lib/utils';
import { queryClient } from '@/main';
import { getLayersArr } from '@/mock/layer';
import {
   deleteLayerPriority,
   fetchLayerPriorityList,
} from '@/services/actions/layer-priority';
import { Layer, LayerPriority } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
   ColumnDef,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiEditFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';

const LayerPriorityTable = ({ layers }: { layers: Layer[] }) => {
   const navigate = useNavigate();
   const routes = useLinkRoutes();
   const searchParam = useSearchParams();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [currentData, setCurrentData] = useState<LayerPriority | null>(null);
   const [currentLayer, setCurrentLayer] = useState(
      searchParam.get('layer') ?? layers[0].name ?? ''
   );

   const src: string = searchParam.get('src') ?? '';
   const paths: string = searchParam.get('paths') ?? '';
   const parentId: string = searchParam.get('parentId') ?? '';

   const { data, isLoading } = useQuery<LayerPriority[]>({
      queryKey: [API_ROUTES.layerPriority.getAll(), { src, currentLayer }],
      queryFn: () => fetchLayerPriorityList({ query: { parentId } }),
   });

   const deleteMutation = useMutation({
      mutationFn: deleteLayerPriority,
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [
               API_ROUTES.layerPriority.getAll(),
               { src, currentLayer },
            ],
         });
      },
   });

   // Effect to handle navigation based on the current layer and paths
   useEffect(() => {
      if (!(currentLayer && paths)) {
         navigate(
            `${routes.layerPriority()}?layer=${layers[0].name}&paths=/${
               layers[0].name
            }`
         );
      }

      if (!currentLayer) {
         navigate(
            `${routes.layerPriority()}?layer=${layers[0].name}&paths=/${
               layers[0].name
            }`
         );
      }

      if (paths === '/') {
         navigate(
            `${routes.layerPriority()}?layer=${layers[0].name}&paths=/${
               layers[0].name
            }`
         );
      }
   }, [currentLayer, paths, navigate, routes]);

   // Effect to update `currentLayer` when the `layers` array changes or if `currentLayer` is empty
   useEffect(() => {
      if (layers && layers.length > 0 && currentLayer.length <= 0) {
         setCurrentLayer(layers[0].name);
      }
   }, [layers]);

   // Effect to set `currentLayer` from the search parameters
   useEffect(() => {
      setCurrentLayer(searchParam.get('layer'));
   }, [searchParam]);

   const handleDeleteButtonClick = (data: LayerPriority) => {
      setCurrentData(data);
      setIsDeleteModalOpen(true);
   };

   const handleDelete = () => {
      if (currentData) {
         deleteMutation.mutate(Number(currentData.id));
      }
      setIsDeleteModalOpen(false);
   };

   const getCreateButton = () => {
      return (
         <CLink
            to={{
               pathname: routes.layerPriorityCreate(),
               search: `?layer=${
                  currentLayer ? currentLayer.toLowerCase() : ''
               }&paths=${paths}/create-${currentLayer}${
                  parentId ? '&parentId=' + parentId : ''
               }`,
            }}
            className='py-3 px-10 bg-c-primary rounded-xl text-base text-c-white hover:bg-c-hover capitalize'>
            Create {currentLayer}
         </CLink>
      );
   };

   const getEditButton = (id: string, slug: string) => {
      return (
         <CLink
            to={{
               pathname: routes.layerPriorityEdit(id),
               search: `?layer=${
                  currentLayer ? currentLayer.toLowerCase() : ''
               }&paths=${paths}/${slug}/edit-${currentLayer}`,
            }}>
            <Button tabIndex={-1} variant='ghost'>
               <RiEditFill className='text-blue-400 !w-[20px] !h-[20px]' />
            </Button>
         </CLink>
      );
   };

   const getDeleteButton = (data: LayerPriority) => {
      return (
         <Button variant='ghost' onClick={() => handleDeleteButtonClick(data)}>
            <MdDelete className='text-c-secondary !w-[20px] !h-[20px]' />
         </Button>
      );
   };

   const getColumns = (
      getEditButton: (id: string, slug: string) => JSX.Element,
      getDeleteButton: (data: LayerPriority) => JSX.Element
   ): ColumnDef<LayerPriority>[] => {
      return [
         {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
               if (!isLastLayer(layers, currentLayer)) {
                  return (
                     <CLink
                        className='hover:underline hover:text-c-primary'
                        to={{
                           pathname: routes.layerPriority(),
                           search: `?src=${getSlug(
                              row.original.name
                           )}&paths=${paths}/${getSlug(
                              row.original.name
                           )}$nextLayer=${
                              getLayersArr(layers)[
                                 getNextLayer(
                                    layers,
                                    getSlug(
                                       row.original.layer.name
                                    ).toLowerCase()
                                 )
                              ]
                           }$parentId=${row.original.id}&layer=${
                              getLayersArr(layers)[
                                 getNextLayer(
                                    layers,
                                    currentLayer
                                       ? currentLayer.toLowerCase()
                                       : ''
                                 )
                              ]
                           }&parentId=${row.original.id}`,
                        }}>
                        {row.original.name}
                     </CLink>
                  );
               } else {
                  return <p className=''>{row.original.name}</p>;
               }
            },
         },
         {
            accessorKey: 'layer',
            header: 'Layer',
            cell: ({ row }) => <span>{row.original.layer?.name}</span>,
         },
         {
            accessorKey: 'priority',
            header: 'Priority',
            cell: ({ row }) => <span>{row.original.priority?.name}</span>,
         },
         {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
               <div className='flex gap-2'>
                  {getEditButton(row.original.id, getSlug(row.original.name))}
                  {getDeleteButton(row.original)}
               </div>
            ),
         },
      ];
   };

   const columns = getColumns(getEditButton, getDeleteButton);

   const table = useReactTable<any>({
      data: data ?? [],
      columns,
      enableRowSelection: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   const isFiltered =
      table.getState().columnFilters.filter(each => each.id === 'name').length >
      0;

   return (
      <div>
         <div>
            {/* {isLoading && <Loading />} */}
            <div className='flex items-center justify-between mb-4'>
               <div className='flex items-center'>
                  <CInput.SearchInput
                     placeholder='Search...'
                     value={
                        (table.getColumn('name')?.getFilterValue() as string) ??
                        ''
                     }
                     onChange={event =>
                        table
                           .getColumn('name')
                           ?.setFilterValue(event.target.value)
                     }
                     className='h-[50px] w-[150px] lg:w-[250px] xl:w-[380px]'
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
               <div className='flex items-center gap-3 shrink-0'>
                  {getCreateButton()}
               </div>
            </div>
            <div className='mb-2'>
               {isLoading && (
                  <div className='p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-md'>
                     <Loading />
                  </div>
               )}
               {!isLoading && data && (
                  <>
                     <div className={`${data.length <= 0 && 'hidden'}`}>
                        <PureDataTable columns={columns} table={table} />
                     </div>
                     <div
                        className={`p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-md ${
                           data && data.length > 0 && 'hidden'
                        }`}>
                        <img
                           src={ListEmpty}
                           width={135}
                           height={160}
                           alt='logo'
                        />
                        <h3 className='font-semibold text-2xl text-c-border-stroke'>
                           Your {src} List is empty
                        </h3>
                     </div>
                  </>
               )}
            </div>
            <DataTablePagination table={table} />
            <DeleteConfirmDialog
               src={src}
               data={currentData}
               isDeleteModalOpen={isDeleteModalOpen}
               isDeleting={deleteMutation.isPending}
               setIsDeleteModalOpen={setIsDeleteModalOpen}
               handleDelete={handleDelete}
            />
         </div>
      </div>
   );
};

export default LayerPriorityTable;
