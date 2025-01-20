import { logout } from '@/services/apis/auth';
import { useState } from 'react';

export default function useLogout() {
   const [submitting, setSubmitting] = useState(false);
   const [openLogoutModal, setOpenLogoutModal] = useState(false);

   const handleLogout = async () => {
      try {
         setSubmitting(true);
         const res = await logout();
         if (res == 'success') {
            window.location.href = `${import.meta.env.VITE_PUBLIC_MAIN_LOGIN}`;
         }
      } finally {
         setSubmitting(false);
      }
   };

   function handleLogoutModal() {
      setOpenLogoutModal(!openLogoutModal);
   }

   return {
      submitting,
      openLogoutModal,
      handleLogoutModal,
      handleLogout,
   };
}
