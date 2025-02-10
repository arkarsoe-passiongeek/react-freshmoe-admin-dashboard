import CButton from '@/components/ui-custom/c-button';
import { Trash } from 'lucide-react';
import { BaseDialog } from './base-dialog';

type DeleteConfirmDialogProps = {
   isDeleteModalOpen: boolean;
   setIsDeleteModalOpen: (isOpen: boolean) => void;
   handleDelete: () => void;
   isDeleting?: boolean;
   title?: string;
   description?: string;
};

const DeleteConfirmDialog = ({
   isDeleteModalOpen,
   setIsDeleteModalOpen,
   handleDelete,
   isDeleting = false,
   title = 'item',
   description = 'Are you sure you would like to delete this?',
}: DeleteConfirmDialogProps) => {
   return (
      <BaseDialog
         title={`Delete ${title}`}
         description={description}
         isOpen={isDeleteModalOpen}
         onClose={() => setIsDeleteModalOpen(false)}>
         <div className='h-[311px] p-10 flex flex-col items-center justify-center space-y-[15px]'>
            <div className='w-[90px] h-[90px] bg-c-secondary bg-opacity-20 rounded-full flex items-center justify-center'>
               <Trash className='text-secondary w-[40px] h-[40px]' />
            </div>
            <div className='text-center space-y-[10px]'>
               <h1 className='text-lg text-secondary font-semibold capitalize'>
                  Delete this {title}
               </h1>
               <p className='max-w-[309px] text-base text-c-contrast'>
                  {description}
               </p>
            </div>
            <div className='flex gap-4 w-full'>
               <CButton
                  className='w-full'
                  variant='outline'
                  type='button'
                  onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
               </CButton>
               <CButton
                  className='w-full'
                  variant='destructive'
                  type='button'
                  onClick={handleDelete}
                  loading={isDeleting}>
                  Delete
               </CButton>
            </div>
         </div>
      </BaseDialog>
   );
};

export default DeleteConfirmDialog;
