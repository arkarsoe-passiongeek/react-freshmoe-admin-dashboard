import CreateSuccessDialog from '@/components/layout/dialogs/create-success-dialog';
import useSearchParams from '@/hooks/use-search-params';
import { useLinkRoutes } from '@/lib/route';
import { useState } from 'react';
import { useLayer } from '../layer/hooks';
import { ServiceAreaCreateForm } from './components/service-area-create-form'; // Updated the import to match service area form

const ServiceAreaCreatePage = () => {
   const [createSuccessModalOpen, setCreateSuccessModalOpen] = useState(false);
   const routes = useLinkRoutes();
   const searchParam = useSearchParams();

   const onCreateSuccess = () => {
      setCreateSuccessModalOpen(true);
   };

   const { data, isLoading } = useLayer();

   // const { data: serviceAreas, isLoading: isServiceAreaLoading } = useQuery<
   //    ServiceArea[]
   // >({
   //    queryKey: [
   //       API_ROUTES.serviceArea.getAll(),
   //       { parentId: searchParam.get('parentId') ?? null },
   //    ],
   //    queryFn: () =>
   //       fetchServiceAreaList({
   //          parentId: searchParam.get('parentId') ?? null,
   //       }),
   // });

   return (
      <div className='bg-c-white border p-10 rounded-md max-w-3xl'>
         {!isLoading && (
            <ServiceAreaCreateForm
               layers={data}
               onCreateSuccess={onCreateSuccess}
            />
         )}
         {/* Updated to ServiceAreaCreateForm */}
         <CreateSuccessDialog
            src='Service Area'
            createSuccessModalOpen={createSuccessModalOpen}
            setCreateSuccessModalOpen={setCreateSuccessModalOpen}
            redirectRoute={routes.serviceArea({
               search: `?parentId=${searchParam.get('parentId')}`,
            })}
         />
      </div>
   );
};

export default ServiceAreaCreatePage;
