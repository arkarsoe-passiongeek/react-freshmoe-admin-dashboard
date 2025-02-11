import LogoutDialog from '@/components/common/dialogs/logout-dialog';
import Link from '@/components/common/link';
import CButton from '@/components/ui-custom/c-button';
import { paths } from '@/config/paths';
import { logout } from '@/features/auth/api/logout';
import useAuth from '@/state/use-auth-store';
import { User } from '@/types/models/profile';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@radix-ui/react-popover';
import { User as IconUser, Lock } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoPersonCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router';

const AccountController = ({ user }: { user: User }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const { setUser, setToken } = useAuth();
   const [logoutModal, setLogoutModal] = useState(false);
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         setLoading(true);
         const res = await logout();
         if (res === 'success') {
            setUser(undefined);
            setToken(undefined);
            navigate(paths.notAuthorized.path);
         } else setLogoutModal(false);
      } catch {
         setLogoutModal(false);
      } finally {
         setLoading(false);
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
                        <span className='text-sm'>{user?.email}</span>
                        <span className='text-c-contrast capitalize text-xs'>
                           {user?.name}
                        </span>
                     </>
                  )}
               </div>
               <Link
                  onClick={() => setIsOpen(false)}
                  className='flex justify-start border-0 rounded-xl text-c-contrast gap-1 p-3 text-sm items-center hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary'
                  to={paths.profile.path}>
                  <IconUser className='mr-2 w-5 h-5 font-bold' />
                  <span>Profile</span>
               </Link>
               <Link
                  onClick={() => setIsOpen(false)}
                  className='flex justify-start border-0 rounded-xl text-c-contrast gap-1 p-3 text-sm items-center hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary'
                  to={paths.profile.changePassword.path}>
                  <Lock className='mr-2 w-5 h-5 font-bold' />
                  <span>Change Password</span>
               </Link>
               <CButton
                  size='sm'
                  variant='destructive'
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
               loading={loading}
            />,
            document.body,
         )}
      </>
   );
};

export default AccountController;
