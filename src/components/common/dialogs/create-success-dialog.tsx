import Link from '@/components/common/link';
import CButton from '@/components/ui-custom/c-button';
import { IoMdCheckmark } from 'react-icons/io';
import { BaseDialog } from './base-dialog';

// Props type for CreateSuccessDialog
interface CreateSuccessDialogProps {
   createSuccessModalOpen: boolean;
   setCreateSuccessModalOpen: (_isOpen: boolean) => void;
   src: string;
   redirectRoute: string;
}

const CreateSuccessDialog = ({
   createSuccessModalOpen,
   setCreateSuccessModalOpen,
   src,
   redirectRoute,
}: CreateSuccessDialogProps) => {
   return (
      <div>
         <BaseDialog
            title='Successfully'
            description={`Successfully created the ${src}.`}
            isOpen={createSuccessModalOpen}
            onClose={() => setCreateSuccessModalOpen(false)}>
            <div className='h-[311px] p-[25px]'>
               <div className='text-center flex flex-col space-y-[20px] items-center h-full justify-center'>
                  <div className='w-[90px] h-[90px] bg-c-button-bg rounded-full shrink-0 flex items-center justify-center'>
                     <div className='w-[50px] h-[50px] bg-c-primary bg-opacity-20 rounded-full shrink-0 flex items-center justify-center'>
                        <IoMdCheckmark className='text-c-primary font-bold w-[30px] h-[30px]' />
                     </div>
                  </div>
                  <div className='space-y-[10px]'>
                     <h1 className='text-lg text-c-primary font-semibold'>
                        Successfully
                     </h1>
                     <p className='max-w-[309px] text-base text-c-contrast'>
                        Successfully created the {src}.
                     </p>
                  </div>
                  <div className='flex gap-4 w-full'>
                     <CButton
                        asChild
                        className='w-full capitalize'
                        onClick={() => setCreateSuccessModalOpen(false)}>
                        <Link to={redirectRoute} className='w-full'>
                           See All {src}
                        </Link>
                     </CButton>
                  </div>
               </div>
            </div>
         </BaseDialog >
      </div >
   );
};

export default CreateSuccessDialog;
