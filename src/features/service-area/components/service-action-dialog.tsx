import { BaseDialog } from '@/components/common/dialogs/base-dialog';
import { Switch } from '@/components/ui/switch';
import { ServiceArea } from '@/types';
import { useCheckServiceAreaService } from '../api/check-service-area-service';

const ServiceActionDialog = ({
   data,
   isOpen,
   onClose,
}: {
   data: ServiceArea | null;
   isOpen: boolean;
   onClose: () => void;
}) => {
   const checkServiceAreaService = useCheckServiceAreaService({
      parentId: data?.parentId ? String(data.parentId) : 'null',
   });

   if (!data) {
      return null;
   }

   return (
      <BaseDialog
         isOpen={isOpen}
         onClose={onClose}
         title='Service Action Dialog'
         description='Service Action Dialog Description'>
         <div className='p-5 space-y-5'>
            <h3 className='text-xl font-semibold'>Services Endpoint</h3>
            <div className=''>
               <div className='flex items-center justify-between h-12'>
                  <span className='text-base font-normal'>B2B</span>
                  <span>
                     <Switch
                        defaultChecked={data?.b2bServiceStatus}
                        onCheckedChange={value => {
                           checkServiceAreaService.mutate({
                              serviceAreaId: String(data?.id),
                              data: {
                                 status: value,
                                 statusType: 'service',
                                 serviceType: 'b2b',
                              },
                           });
                        }}
                     />
                  </span>
               </div>
            </div>
         </div>
      </BaseDialog>
   );
};

export default ServiceActionDialog;
