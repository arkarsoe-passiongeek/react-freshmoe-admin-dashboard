import { Card } from '@/components/ui/card';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';
import { isAuth } from '@/lib/authentication';
import useAuth from '@/state/use-auth-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
export default function Login() {
   const navigate = useNavigate();

   const { user } = useAuth();

   useEffect(() => {
      if (isAuth()) {
         navigate(paths.root.path);
      }
   }, [user]);

   return (
      <div>
         <div className='flex justify-center items-center h-[100vh] bg-c-primary-7'>
            <Card className='p-7 w-[410px] 2xl:w-[460px] mb-[80px] mt-[122px]'>
               <div className='space-y-[10px] mb-5'>
                  <img
                     src={'/main-logo.png'}
                     width={178}
                     height={80}
                     alt='logo'
                     className='object-contain mx-auto'
                  />
                  <h1 className='text-c-primary text-center text-lg font-semibold'>
                     Please Log Into your account!
                  </h1>
               </div>
               <LoginForm onSuccess={() => navigate(paths.root.path)} />
            </Card>
         </div>
      </div>
   );
}
