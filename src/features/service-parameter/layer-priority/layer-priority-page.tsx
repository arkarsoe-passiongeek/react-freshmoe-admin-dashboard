import { useQuery } from "@tanstack/react-query";
import LayerPriorityTable from "./components/layer-priority-table";
import { API_ROUTES } from "@/lib/constants";
import { fetchLayerList } from "@/services/actions/layer";
import Loading from "@/components/layout/loading";

const LayerPriorityPage = () => {
  // Fetching the layers
  const { data: layers, isLoading: isLayersLoading } = useQuery({
    queryKey: [API_ROUTES.layer.getAll()],
    queryFn: async () => await fetchLayerList(),
  });
  return (
    <div>
      {isLayersLoading && <Loading />}
      {!isLayersLoading && layers && <LayerPriorityTable layers={layers} />}
    </div>
  );
};

export default LayerPriorityPage;
