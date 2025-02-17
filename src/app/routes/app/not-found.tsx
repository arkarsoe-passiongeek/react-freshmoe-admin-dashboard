import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { Link } from 'react-router';

const NotFoundPage = () => {
   return (
      <div>
         <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='flex flex-col items-center space-y-8'>
               <h1 className='text-[200px] font-bold uppercase'>404</h1>
               <p className='text-4xl text-c-contrast !mt-0'>
                  Oops! Page Not Found.
               </p>
               <Button asChild size='md'>
                  <Link to={paths.root.path}>Back to Dashboard</Link>
               </Button>
            </div>
         </div>
      </div>
   );
};

export default NotFoundPage;
