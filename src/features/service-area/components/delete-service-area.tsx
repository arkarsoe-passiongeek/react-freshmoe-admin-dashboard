import DeleteConfirmDialog from '@/components/common/dialogs/delete-confirm-dialog';
import CButton from '@/components/ui-custom/c-button';
import { useNotifications } from '@/components/ui/notifications';
import useSearchParams from '@/hooks/use-search-params';
import { ServiceArea } from '@/types';
import { useState } from 'react';
import { useDeleteServiceArea } from '../api/delete-service-area';

const DeleteServiceArea = ({ data }: { data: ServiceArea }) => {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const { addNotification } = useNotifications();
   const searchParams = useSearchParams();

   const deleteServiceAreaMutation = useDeleteServiceArea({
      parentId: searchParams.get('parentId') ?? 'null',
      mutationConfig: {
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'Service Area Deleted',
            });
            setIsDeleteModalOpen(false);
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
            title='service area'
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            handleDelete={() =>
               deleteServiceAreaMutation.mutate({
                  serviceAreaId: String(data.id),
               })
            }
            isDeleting={deleteServiceAreaMutation.isPending}
         />
      </>
   );
};

export default DeleteServiceArea;
