import InfoItem from '@/components/common/info/item';
import Link from '@/components/common/link';
import Loading from '@/components/layouts/loading';
import CButton from '@/components/ui-custom/c-button';
import { paths } from '@/config/paths';
import { useNavigate, useParams } from 'react-router';
import { useServiceType } from '../api/get-service-type';

const ServiceTypeViewPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   if (!id) {
      navigate(paths.notFound.path);
      return null;
   }

   const serviceTypeQuery = useServiceType({ serviceTypeId: id });

   const serviceType = serviceTypeQuery.data?.data;

   if (serviceTypeQuery.isLoading) {
      return <Loading />;
   }

   return (
      <div className='bg-c-white border p-10 rounded-md max-w-3xl'>
         {serviceType && (
            <div className='space-y-[30px]'>
               <div className='flex justify-between items-center'>
                  <h3 className='text-xl font-semibold'>
                     Service Type Information
                  </h3>
                  <CButton size='xs' asChild>
                     <Link to={paths.serviceType.edit.getHref(String(id))}>
                        Edit
                     </Link>
                  </CButton>
               </div>
               <div className='flex flex-col gap-7'>
                  <InfoItem label='Name' data={serviceType.name} />
               </div>
            </div>
         )}
      </div>
   );
};

export default ServiceTypeViewPage;
