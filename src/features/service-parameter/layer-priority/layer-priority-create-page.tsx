import CreateSuccessDialog from "@/components/layout/dialogs/create-success-dialog";
import { API_ROUTES } from "@/lib/constants";
import { useLinkRoutes } from "@/lib/route";
import { fetchLayerList } from "@/services/actions/layer";
import { fetchPriorityList } from "@/services/actions/priority";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LayerPriorityCreateForm } from "./components/layer-priority-create-form";

const LayerPriorityCreatePage = () => {
  const [createSuccessModalOpen, setCreateSuccessModalOpen] = useState(false);
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

  // Handle successful creation
  const onCreateSuccess = () => {
    setCreateSuccessModalOpen(true);
  };

  if (isLayersLoading || isPrioritiesLoading) {
    return <div>Loading...</div>;
  }

  if (layersError || prioritiesError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="bg-c-white border p-10 rounded-md max-w-3xl">
      <LayerPriorityCreateForm
        onCreateSuccess={onCreateSuccess}
        layers={layers ?? []} // Pass layers to the form
        priorities={priorities ?? []} // Pass priorities to the form
      />
      <CreateSuccessDialog
        src="Layer Priority"
        createSuccessModalOpen={createSuccessModalOpen}
        setCreateSuccessModalOpen={setCreateSuccessModalOpen}
        redirectRoute={routes.layerPriority()}
      />
    </div>
  );
};

export default LayerPriorityCreatePage;
