import CButton from '@/components/custom/c-button';
import { IoIosLogOut } from 'react-icons/io';
import { BaseDialog } from './base-dialog';

type LogoutDialogProps = {
   isLogoutModalOpen: boolean;
   setIsLogoutModalOpen: (isOpen: boolean) => void;
   handleLogout: () => void;
   loading: boolean;
};

const LogoutDialog: React.FC<LogoutDialogProps> = ({
   isLogoutModalOpen,
   setIsLogoutModalOpen,
   handleLogout,
   loading,
}) => {
   return (
      <div>
         <BaseDialog
            title={`Logout`}
            description='Do you want to log out from Dashboard?'
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}>
            <div className='h-[311px] p-10'>
               <div className='text-center flex flex-col space-y-[15px] items-center h-full justify-center'>
                  <div className='w-[90px] h-[90px] bg-secondary/20 rounded-full shrink-0 flex items-center justify-center'>
                     <IoIosLogOut className='text-secondary w-[40px] h-[40px]' />
                  </div>
                  <div className='space-y-[10px]'>
                     <h1 className='text-lg text-secondary font-semibold capitalize'>
                        Logout
                     </h1>
                     <p className='max-w-[309px] text-base text-c-contrast'>
                        Do you want to log out from Dashboard?
                     </p>
                  </div>
                  <div className='flex gap-4 w-full'>
                     <CButton
                        className='w-full'
                        styleType='cancel'
                        type='button'
                        onClick={() => setIsLogoutModalOpen(false)}>
                        Cancel
                     </CButton>
                     <CButton
                        className='w-full'
                        styleType='delete'
                        type='button'
                        onClick={() => handleLogout()}
                        loading={loading}>
                        Logout
                     </CButton>
                  </div>
               </div>
            </div>
         </BaseDialog>
      </div>
   );
};

export default LogoutDialog;
