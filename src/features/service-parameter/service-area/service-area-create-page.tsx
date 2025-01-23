import CreateSuccessDialog from '@/components/layout/dialogs/create-success-dialog';
import { useLinkRoutes } from '@/lib/route';
import { useState } from 'react';
import { useLayer } from '../layer/hooks';
import { ServiceAreaCreateForm } from './components/service-area-create-form'; // Updated the import to match service area form
import { useServiceArea } from './hooks';

const ServiceAreaCreatePage = () => {
   const [createSuccessModalOpen, setCreateSuccessModalOpen] = useState(false);
   const routes = useLinkRoutes();

   const onCreateSuccess = () => {
      setCreateSuccessModalOpen(true);
   };

   const { data, isLoading } = useLayer();

   const { data: serviceAreas, isLoading: isServiceAreaLoading } =
      useServiceArea();

   return (
      <div className='bg-c-white border p-10 rounded-md max-w-3xl'>
         {!isLoading && !isServiceAreaLoading && (
            <ServiceAreaCreateForm
               layers={data}
               serviceAreas={serviceAreas}
               onCreateSuccess={onCreateSuccess}
            />
         )}
         {/* Updated to ServiceAreaCreateForm */}
         <CreateSuccessDialog
            src='Service Area'
            createSuccessModalOpen={createSuccessModalOpen}
            setCreateSuccessModalOpen={setCreateSuccessModalOpen}
            redirectRoute={routes.serviceArea()}
         />
      </div>
   );
};

export default ServiceAreaCreatePage;
