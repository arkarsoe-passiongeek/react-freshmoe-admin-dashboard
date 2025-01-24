import { useLinkRoutes } from '@/lib/route';
import CLink from '../custom/c-link';

const NotFoundPage = () => {
   const routes = useLinkRoutes();

   return (
      <div>
         <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='flex flex-col items-center space-y-8'>
               <h1 className='text-[200px] font-bold uppercase'>404</h1>
               <p className='text-4xl text-c-contrast !mt-0'>
                  Oops! Page Not Found.
               </p>
               <CLink to={routes.dashboard()} className='bg-primary'>
                  Back to Dashboard
               </CLink>
            </div>
         </div>
      </div>
   );
};

export default NotFoundPage;
