import freshmoeSite from '@/assets/images/freshmoeSite.png';
import Loading from '@/components/layout/loading';
import { Switch } from '@/components/ui/switch';
import { API_ROUTES } from '@/lib/constants';
import { queryClient } from '@/main';
import {
   changeMaintenanceStatus,
   fetchMaintenanceStatus,
} from '@/services/actions/maintenance';
import { useMutation, useQuery } from '@tanstack/react-query';

const MaintenancePage = () => {
   const { data: status, isLoading } = useQuery({
      queryKey: [API_ROUTES.maintenance.get()],
      queryFn: async () => await fetchMaintenanceStatus(),
   });

   const updateMutation = useMutation({
      mutationFn: changeMaintenanceStatus,
      onError: error => {
         console.log(error);
      },
      onSuccess: () => {
         // Boom baby!
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.maintenance.get()],
         });
      },
   });

   return (
      <>
         {isLoading && <Loading />}
         {!isLoading && (
            <div className='bg-white rounded-md w-[430px] min-h-[203px] space-y-2 p-2'>
               <img
                  className='w-[430px] h-[203px]'
                  src={freshmoeSite}
                  alt='Freshmoe site'
               />
               <div className='inline-flex justify-between w-full items-center gap-2'>
                  <label htmlFor={'switch'}>Status</label>
                  <Switch
                     defaultChecked={status}
                     id={'switch'}
                     onCheckedChange={value =>
                        updateMutation.mutate({ status: +value })
                     }
                     className='h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3'
                  />
               </div>
            </div>
         )}
      </>
   );
};

export default MaintenancePage;
