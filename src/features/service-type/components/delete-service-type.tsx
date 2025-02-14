import DeleteConfirmDialog from '@/components/common/dialogs/delete-confirm-dialog';
import CButton from '@/components/ui-custom/c-button';
import { useNotifications } from '@/components/ui/notifications';
import { ServiceType } from '@/types';
import { useState } from 'react';
import { useDeleteServiceType } from '../api/delete-service-type';

const DeleteServiceType = ({ data }: { data: ServiceType }) => {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const { addNotification } = useNotifications();
   const deleteServiceTypeMutation = useDeleteServiceType({
      mutationConfig: {
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'ServiceType Deleted',
            });
         },
      },
   });

   return (
      <>
         <CButton
            size='xs'
            variant='destructive'
            onClick={() => setIsDeleteModalOpen(true)}>
            Delete
         </CButton>
         <DeleteConfirmDialog
            title='serviceType'
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            handleDelete={() =>
               deleteServiceTypeMutation.mutate({ serviceTypeId: String(data.id) })
            }
            isDeleting={deleteServiceTypeMutation.isPending}
         />
      </>
   );
};

export default DeleteServiceType;
