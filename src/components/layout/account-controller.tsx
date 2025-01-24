import { useLinkRoutes } from '@/lib/route';
import { logout } from '@/services/apis/auth';
import { User } from '@/types/models/profile';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@radix-ui/react-popover';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoPersonCircle } from 'react-icons/io5';
import CButton from '../custom/c-button';
import CLink from '../custom/c-link';
import IconLock from '../icons/IconLock';
import IconUser from '../icons/IconUser';
import LogoutDialog from './dialogs/logout-dialog';

const AdminController = ({ user }: { user: User | null }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [submitting, setSubmitting] = useState(false);
   const [logoutModal, setLogoutModal] = useState(false);
   const routes = useLinkRoutes();

   const handleLogout = async () => {
      console.log('test');
      setSubmitting(true);
      try {
         const res = await logout();
         console.log(res);
         if (res === 'success')
            window.location.href = `${import.meta.env.VITE_PUBLIC_MAIN_LOGIN}`;
      } catch (e) {
         console.log(e);
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
               className='bg-c-white p-4 shadow rounded-lg space-y-2 min-w-[200px] z-50'
               align='end'>
               <div className='flex flex-col'>
                  {user && (
                     <>
                        <span className='text-sm'>{user.email}</span>
                        <span className='text-c-contrast capitalize text-xs'>
                           {user?.username}
                        </span>
                     </>
                  )}
               </div>
               <CLink
                  onClick={() => setIsOpen(false)}
                  size='sm'
                  to={routes.profile()}
                  className='flex justify-start border-0 text-c-contrast gap-1 p-3 text-sm items-center'>
                  <IconUser className='mr-2 w-5 h-5 font-bold' />
                  <span>Profile</span>
               </CLink>
               <CLink
                  onClick={() => setIsOpen(false)}
                  size='sm'
                  to={routes.changePassword()}
                  className='flex justify-start border-0 text-c-contrast gap-1 p-3 text-sm items-center'>
                  <IconLock className='mr-2 w-5 h-5 font-bold' />
                  <span>Change Password</span>
               </CLink>
               {/* FIXME */}
               <CButton
                  size='sm'
                  styleType='delete'
                  tabIndex={-1}
                  className='w-full'
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
