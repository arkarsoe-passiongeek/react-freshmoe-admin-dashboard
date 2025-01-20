import { logout } from '@/services/apis/auth';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@radix-ui/react-popover';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoPersonCircle } from 'react-icons/io5';
import CButton from '../custom/c-button';
import { User as IUser } from './dashboard-layout';
import LogoutDialog from './dialogs/logout-dialog';

const AdminController = ({ user }: { user: IUser | null }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [submitting, setSubmitting] = useState(false);
   const [logoutModal, setLogoutModal] = useState(false);

   const handleLogout = async () => {
      try {
         setSubmitting(true);
         const res = await logout();
         if (res == 'success') console.log(res);
         window.location.href = `${import.meta.env.VITE_PUBLIC_MAIN_LOGIN}`;
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <>
         <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
               <div className='flex justify-between items-center gap-4 cursor-pointer'>
                  <IoPersonCircle className='w-[50px] h-[50px] text-primary' />
               </div>
            </PopoverTrigger>
            <PopoverContent
               className='bg-c-white p-4 shadow rounded-lg space-y-2'
               align='end'>
               <div className='flex flex-col'>
                  {user && (
                     <>
                        <span className='text-sm'>{user.email}</span>
                        <span className='text-c-contrast capitalize text-xs'>
                           {user.username}
                        </span>
                     </>
                  )}
               </div>
               {/* <CLink
            to={routes.profile()}
            className="flex text-c-contrast gap-1 p-1 items-center text-base hover:bg-accent"
          >
            <IconUser className="mr-2 w-5 h-5 font-bold" />
            <span>Profile</span>
          </CLink>
          <CLink
            to={routes.changePassword()}
            className="flex text-c-contrast gap-1 p-1 items-center text-base hover:bg-accent"
          >
            <IconLock className="mr-2 w-5 h-5 font-bold" />
            <span>Change Password</span>
          </CLink> */}
               <CButton
                  className='min-w-[146px] w-full min-h-[34px] text-sm !p-0 bg-red-500 hover:bg-red-600 text-white'
                  onClick={() => setLogoutModal(true)}>
                  Log Out
               </CButton>
            </PopoverContent>
         </Popover>
         {createPortal(
            <LogoutDialog
               isLogoutModalOpen={logoutModal}
               setIsLogoutModalOpen={setLogoutModal}
               handleLogout={handleLogout}
               loading={submitting}
            />,
            document.body
         )}
      </>
   );
};

export default AdminController;
