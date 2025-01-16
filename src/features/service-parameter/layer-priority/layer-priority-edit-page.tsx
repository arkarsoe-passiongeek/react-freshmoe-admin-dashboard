import Loading from "@/components/layout/loading";
import { API_ROUTES } from "@/lib/constants";
import { useLinkRoutes } from "@/lib/route";
import { fetchLayerList } from "@/services/actions/layer";
import { fetchLayerPriorityDetail } from "@/services/actions/layer-priority"; // Assuming the fetch function is imported
import { fetchPriorityList } from "@/services/actions/priority";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { LayerPriorityEditForm } from "./components/layer-priority-edit-form";

const LayerPriorityEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const routes = useLinkRoutes();

  // Fetching the layers
  const {
    data: layers,
    isLoading: isLayersLoading,
    error: layersError,
  } = useQuery({
    queryKey: [API_ROUTES.layer.getAll()],
    queryFn: async () => await fetchLayerList(),
  });

  // Fetching the priorities
  const {
    data: priorities,
    isLoading: isPrioritiesLoading,
    error: prioritiesError,
  } = useQuery({
    queryKey: [API_ROUTES.priority.getAll()],
    queryFn: async () => await fetchPriorityList(),
  });

  // Fetch LayerPriority data
  const { data, isLoading } = useQuery({
    queryKey: [API_ROUTES.layerPriority.view(Number(id))],
    queryFn: async () => await fetchLayerPriorityDetail(Number(id)),
    enabled: !!id, // Only fetch if `id` exists
  });

  // Redirect if `id` is missing
  useEffect(() => {
    if (!id) {
      navigate(routes.layerPriority());
    }
  }, [id, navigate, routes]);

  if (isLayersLoading || isPrioritiesLoading) {
    return <div>Loading...</div>;
  }

  if (layersError || prioritiesError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="bg-c-white border p-10 rounded-md max-w-3xl">
      {isLoading && <Loading />}
      {!isLoading && data && (
        <LayerPriorityEditForm
          layers={layers ?? []}
          priorities={priorities ?? []}
          defaultValues={data}
        />
      )}
    </div>
  );
};

export default LayerPriorityEditPage;
