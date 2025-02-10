import CreateSuccessDialog from '@/components/common/dialogs/create-success-dialog';
import CCard from '@/components/ui-custom/c-card';
import { paths } from '@/config/paths';
import LayerCreateForm from '@/features/layer/components/create-layer';
import { useState } from 'react';

const LayerCreate = () => {
   const [isCreateSuccessModalOpen, setIsCreateSuccessModalOpen] =
      useState(false);

   return (
      <div>
         <CCard className='bg-c-white border p-10 rounded-md max-w-3xl'>
            <LayerCreateForm
               onCreateSuccess={() => setIsCreateSuccessModalOpen(true)}
            />
         </CCard>
         <CreateSuccessDialog
            src='Service Layer'
            createSuccessModalOpen={isCreateSuccessModalOpen}
            setCreateSuccessModalOpen={setIsCreateSuccessModalOpen}
            redirectRoute={paths.layer.path}
         />
      </div>
   );
};

export default LayerCreate;
