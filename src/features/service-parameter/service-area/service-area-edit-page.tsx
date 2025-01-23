import Loading from '@/components/layout/loading';
import { API_ROUTES } from '@/lib/constants';
import { fetchServiceAreaDetail } from '@/services/actions/service-area';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useLayer } from '../layer/hooks';
import { ServiceAreaEditForm } from './components/service-area-edit-form';
import { useServiceArea } from './hooks';

const ServiceAreaEditPage = () => {
   const { id } = useParams();

   const { data, isLoading } = useQuery({
      queryKey: [API_ROUTES.serviceArea.view(Number(id))],
      queryFn: async () => await fetchServiceAreaDetail(Number(id)),
   });

   const { data: layers, isLoading: isLayerLoading } = useLayer();

   const { data: serviceAreas, isLoading: isServiceAreaLoading } =
      useServiceArea();

   return (
      <div className='bg-c-white border p-10 rounded-md max-w-3xl'>
         {isLoading && <Loading />}
         {!isLoading && !isLayerLoading && !isServiceAreaLoading && (
            <ServiceAreaEditForm
               layers={layers}
               serviceAreas={serviceAreas}
               defaultValues={data}
            />
         )}
      </div>
   );
};

export default ServiceAreaEditPage;
