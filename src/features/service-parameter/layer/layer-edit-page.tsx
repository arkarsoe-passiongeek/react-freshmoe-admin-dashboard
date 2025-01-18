import Loading from '@/components/layout/loading';
import { API_ROUTES } from '@/lib/constants';
import { fetchLayerDetail } from '@/services/actions/layer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { LayerEditForm } from './components/layer-edit-form';

const LayerEditPage = () => {
   const { id } = useParams();

   const { data, isLoading } = useQuery({
      queryKey: [API_ROUTES.layer.view(Number(id))],
      queryFn: async () => await fetchLayerDetail(Number(id)),
   });

   return (
      <div className='bg-c-white border p-10 rounded-md max-w-3xl'>
         {isLoading && <Loading />}
         {!isLoading && <LayerEditForm defaultValues={data} />}
      </div>
   );
};

export default LayerEditPage;
