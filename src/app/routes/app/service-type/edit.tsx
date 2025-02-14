import CCard from '@/components/ui-custom/c-card';
import { paths } from '@/config/paths';
import ServiceTypeUpdateForm from '@/features/service-type/components/update-service-type';
import { useNavigate, useParams } from 'react-router';

const ServiceTypeEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   if (!id) {
      navigate(paths.notFound.path);
      return null;
   }

   return (
      <div>
         <CCard className='bg-c-white border p-10 rounded-md max-w-3xl'>
            <ServiceTypeUpdateForm serviceTypeId={id} />
         </CCard>
      </div>
   );
};

export default ServiceTypeEdit;
