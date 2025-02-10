import DeleteConfirmDialog from '@/components/common/dialogs/delete-confirm-dialog';
import CButton from '@/components/ui-custom/c-button';
import { useNotifications } from '@/components/ui/notifications';
import { Layer } from '@/types';
import { useState } from 'react';
import { useDeleteLayer } from '../api/delete-layer';

const DeleteLayer = ({ data }: { data: Layer }) => {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const { addNotification } = useNotifications();
   const deleteLayerMutation = useDeleteLayer({
      mutationConfig: {
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'Layer Deleted',
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
            title='layer'
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            handleDelete={() =>
               deleteLayerMutation.mutate({ layerId: data.id })
            }
            isDeleting={deleteLayerMutation.isPending}
         />
      </>
   );
};

export default DeleteLayer;
