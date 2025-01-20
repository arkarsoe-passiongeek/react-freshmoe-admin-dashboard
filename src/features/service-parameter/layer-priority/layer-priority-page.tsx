import Loading from '@/components/layout/loading';
import { API_ROUTES } from '@/lib/constants';
import { fetchLayerList } from '@/services/actions/layer';
import { useQuery } from '@tanstack/react-query';
import LayerPriorityTable from './components/layer-priority-table';

const LayerPriorityPage = () => {
   // Fetching the layers
   const { data: layers, isLoading: isLayersLoading } = useQuery({
      queryKey: [API_ROUTES.layer.getAll()],
      queryFn: async () => await fetchLayerList(),
   });
   return (
      <div>
         {isLayersLoading && <Loading />}
         {!isLayersLoading && layers && layers.length > 0 && (
            <LayerPriorityTable layers={layers} />
         )}
      </div>
   );
};

export default LayerPriorityPage;
