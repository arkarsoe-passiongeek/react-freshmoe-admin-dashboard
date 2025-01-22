import { useLinkRoutes } from '@/lib/route';
import { getUser } from '@/services/apis/user';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import AdminController from './account-controller';
import { AppSidebar } from './app-sidebar';
import { LanguageContext, LanguageContextType } from './language-handler';
import PageHeader from './page-header';

export interface User {
   id?: number;
   username?: string;
   email?: string;
   // Add other user properties as needed
}

const DashboardLayout: React.FC = () => {
   const [user, setUser] = useState<User | null>(null);
   const { language, setLanguage } = useContext(
      LanguageContext
   ) as LanguageContextType;
   const navigate = useNavigate();
   const { pathname, search } = useLocation();
   const { lang } = useParams<{ lang?: string }>();
   const routes = useLinkRoutes();

   const getUserData = async () => {
      try {
         const res = await getUser();
         setUser(res.data.data);
         localStorage.setItem('userdata', JSON.stringify(res.data.data));
      } catch (error) {
         console.error('Failed to fetch user data', error);
      }
   };

   useEffect(() => {
      if (!Cookies.get('token')) {
         navigate(routes.unauthorized());
      }
      getUserData();
   }, []);

   return (
      <div>
         <div style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
            <div className='bg-c-primary w-full p-[20px]'></div>
            <div className='bg-c-white w-full p-[1px]'></div>
            <div className='bg-c-secondary w-full p-[3.95px]'></div>
         </div>
         <div className='relative'>
            <SidebarProvider>
               <AppSidebar />
               <main className='mt-[50px] w-full'>
                  <div className='flex justify-between items-center p-3 px-6 bg-c-white border-b border-c-border-stroke'>
                     <select
                        className='hidden'
                        defaultValue={language}
                        name='tet'
                        id='test'
                        onChange={e => {
                           const newLang = e.target.value;
                           setLanguage(newLang);
                           navigate(
                              `${
                                 pathname.replace(lang ?? '', newLang) + search
                              }`
                           );
                        }}>
                        <option value='en'>en</option>
                        <option value='fr'>fr</option>
                     </select>
                     <SidebarTrigger className='[&_svg]:size-8' />
                     <AdminController user={user} />
                  </div>
                  <div className='p-6'>
                     <PageHeader />
                     <Outlet />
                  </div>
               </main>
            </SidebarProvider>
         </div>
      </div>
   );
};

export default DashboardLayout;
