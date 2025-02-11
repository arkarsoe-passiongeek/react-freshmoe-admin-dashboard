import DashboardLayout from '@/components/layouts/dashboard/dashboard-layout';
import Loading from '@/components/layouts/loading';
import { useProfile } from '@/features/profile/api/profile';
import useAuth from '@/state/use-auth-store';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

const AuthRoute = () => {
   const { user, setUser, setToken } = useAuth();
   const profileQuery = useProfile({});
   const [checkingUser, setCheckingUser] = useState(true);

   useEffect(() => {
      if (!user && profileQuery.data) {
         if (profileQuery.data?.data) {
            setUser(profileQuery.data?.data);
            setToken(profileQuery.data?.data?.token || '');
         }
      }
      setCheckingUser(false);
   }, [profileQuery.data]);

   if (profileQuery.isLoading || checkingUser) {
      return (
         <div className='w-full h-[100vh] flex items-center justify-center'>
            <Loading className='w-10 h-10' />
         </div>
      );
   }

   return (
      <DashboardLayout>
         <Outlet />
      </DashboardLayout>
   );
};

export default AuthRoute;
