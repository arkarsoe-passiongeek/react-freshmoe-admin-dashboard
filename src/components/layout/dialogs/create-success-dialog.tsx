import CButton from '@/components/custom/c-button';
import { Link } from '@/i18n/routing';
import { IoMdCheckmark } from 'react-icons/io';
import { BaseDialog } from './base-dialog';

// Props type for CreateSuccessDialog
interface CreateSuccessDialogProps {
   createSuccessModalOpen: boolean;
   setCreateSuccessModalOpen: (isOpen: boolean) => void;
   src: string;
   redirectRoute: string;
}

const CreateSuccessDialog: React.FC<CreateSuccessDialogProps> = ({
   createSuccessModalOpen,
   setCreateSuccessModalOpen,
   src,
   redirectRoute,
}) => {
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
                     <Link to={redirectRoute} className='w-full'>
                        <CButton
                           styleType='success'
                           className='w-full capitalize'
                           type='button'
                           onClick={() => setCreateSuccessModalOpen(false)}>
                           See All {src}
                        </CButton>
                     </Link>
                  </div>
               </div>
            </div>
         </BaseDialog>
      </div>
   );
};

export default CreateSuccessDialog;
