import CreateSuccessDialog from '@/components/common/dialogs/create-success-dialog';
import CCard from '@/components/ui-custom/c-card';
import { paths } from '@/config/paths';
import ServiceTypeCreateForm from '@/features/service-type/components/create-service-type';
import { useState } from 'react';

const ServiceTypeCreate = () => {
   const [isCreateSuccessModalOpen, setIsCreateSuccessModalOpen] =
      useState(false);

   return (
      <div>
         <CCard className='bg-c-white border p-10 rounded-md max-w-3xl'>
            <ServiceTypeCreateForm
               onCreateSuccess={() => setIsCreateSuccessModalOpen(true)}
            />
         </CCard>
         <CreateSuccessDialog
            src='Service Type'
            createSuccessModalOpen={isCreateSuccessModalOpen}
            setCreateSuccessModalOpen={setIsCreateSuccessModalOpen}
            redirectRoute={paths.serviceType.path}
         />
      </div>
   );
};

export default ServiceTypeCreate;
