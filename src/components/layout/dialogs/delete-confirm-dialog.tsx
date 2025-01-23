import CButton from '@/components/custom/c-button';
import { Trash } from 'lucide-react';
import { BaseDialog } from './base-dialog';

type DeleteConfirmDialogProps = {
   isDeleteModalOpen: boolean;
   setIsDeleteModalOpen: (isOpen: boolean) => void;
   handleDelete: () => void;
   isDeleting?: boolean;
   data?: {
      name?: string;
   } | null;
   src?: string;
};

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
   isDeleteModalOpen,
   setIsDeleteModalOpen,
   handleDelete,
   isDeleting = false,
   data,
   src,
}) => {
   return (
      <div>
         <BaseDialog
            title={`Delete ${data?.name ?? src}`}
            description='Are you sure you would like to delete this?'
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}>
            <div className='h-[311px] p-10'>
               <div className='text-center flex flex-col space-y-[15px] items-center h-full justify-center'>
                  <div className='w-[90px] h-[90px] bg-c-secondary bg-opacity-20 rounded-full shrink-0 flex items-center justify-center'>
                     <Trash className='text-secondary w-[40px] h-[40px]' />
                  </div>
                  <div className='space-y-[10px]'>
                     <h1 className='text-lg text-secondary font-semibold capitalize'>
                        Delete {data?.name}
                     </h1>
                     <p className='max-w-[309px] text-base text-c-contrast'>
                        Are you sure you would like to delete this?
                     </p>
                  </div>
                  <div className='flex gap-4 w-full'>
                     <CButton
                        className='w-full'
                        styleType='cancel'
                        type='button'
                        onClick={() => setIsDeleteModalOpen(false)}>
                        Cancel
                     </CButton>
                     <CButton
                        className='w-full'
                        styleType='delete'
                        type='button'
                        onClick={() => handleDelete()}
                        loading={isDeleting}>
                        Delete
                     </CButton>
                  </div>
               </div>
            </div>
         </BaseDialog>
      </div>
   );
};

export default DeleteConfirmDialog;
