import ErrorBoundary from '@/app/error-boundary';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import useAuth from '@/state/use-auth-store';
import React from 'react';
import AccountController from './account-controller';
import { DashboardSidebar } from './dashboard-sidebar';
import PageHeader from './page-header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const { user: authUser } = useAuth();

   return (
      <div className='bg-c-bg min-h-[800px]'>
         <div style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
            <div className='bg-primary w-full p-[20px]'></div>
            <div className='bg-c-white w-full p-[1px]'></div>
            <div className='bg-secondary w-full p-[3.95px]'></div>
         </div>
         <div className='relative'>
            <SidebarProvider>
               <DashboardSidebar />
               <main className='mt-[50px] w-full'>
                  <div className='sticky top-[50px] px-6 z-10 flex justify-between items-center p-3 bg-c-white border-b border-c-border-stroke'>
                     <SidebarTrigger className='[&_svg]:size-8' />
                     {authUser && <AccountController user={authUser} />}
                  </div>
                  <div className='p-6 h-[calc(100vh-22%)]'>
                     <PageHeader />
                     <ErrorBoundary>{children}</ErrorBoundary>
                  </div>
               </main>
            </SidebarProvider>
         </div>
      </div>
   );
};

export default DashboardLayout;
