import CreateSuccessDialog from '@/components/common/dialogs/create-success-dialog';
import CCard from '@/components/ui-custom/c-card';
import { paths } from '@/config/paths';
import ServiceAreaCreateForm from '@/features/service-area/components/create-service-area';
import useSearchParams from '@/hooks/use-search-params';
import { useState } from 'react';

const ServiceAreaCreatePage = () => {
   const [isCreateSuccessModalOpen, setIsCreateSuccessModalOpen] =
      useState(false);

   const searchParam = useSearchParams();

   return (
      <div>
         <CCard className='bg-c-white border p-10 rounded-md max-w-3xl'>
            <ServiceAreaCreateForm
               parentId={searchParam.get('parentId') ?? ''}
               onCreateSuccess={() => setIsCreateSuccessModalOpen(true)}
            />
         </CCard>
         <CreateSuccessDialog
            src='Service ServiceArea'
            createSuccessModalOpen={isCreateSuccessModalOpen}
            setCreateSuccessModalOpen={setIsCreateSuccessModalOpen}
            redirectRoute={paths.serviceArea.path + `?parentId=${searchParam.get('parentId') ?? 'null'}`}
         />
      </div>
   );
};

export default ServiceAreaCreatePage;
