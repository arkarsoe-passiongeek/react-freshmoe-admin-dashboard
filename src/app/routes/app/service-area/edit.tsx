import CCard from '@/components/ui-custom/c-card';
import { paths } from '@/config/paths';
import ServiceAreaUpdateForm from '@/features/service-area/components/update-service-area';
import useSearchParams from '@/hooks/use-search-params';
import { useNavigate, useParams } from 'react-router';

const ServiceAreaEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const searchParam = useSearchParams();

   if (!id) {
      navigate(paths.notFound.path);
      return null;
   }

   return (
      <div>
         <CCard className='bg-c-white border p-10 rounded-md max-w-3xl'>
            <ServiceAreaUpdateForm
               serviceAreaId={id}
               parentId={searchParam.get('parentId') ?? 'null'}
            />
         </CCard>
      </div>
   );
};

export default ServiceAreaEdit;
