import CLink from "@/components/custom/c-link";
import DeleteConfirmDialog from "@/components/layout/dialogs/delete-confirm-dialog";
import { DataTable } from "@/components/layout/table/data-table";
import { Button } from "@/components/ui/button";
import useSearchParams from "@/hooks/use-search-params";
import { API_ROUTES } from "@/lib/constants";
import { useLinkRoutes } from "@/lib/route";
import { getNextLayer, getSlug, isLastLayer } from "@/lib/utils";
import { queryClient } from "@/main";
import { getLayersArr } from "@/mock/layer";
import {
  deleteLayerPriority,
  fetchLayerPriorityList,
} from "@/services/actions/layer-priority";
import { Layer, LayerPriority } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { useNavigate } from "react-router";

const LayerPriorityTable = ({ layers }: { layers: Layer[] }) => {
  const navigate = useNavigate();
  const routes = useLinkRoutes();
  const searchParam = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<LayerPriority | null>(null);
  const [currentLayer, setCurrentLayer] = useState(
    searchParam.get("layer") ?? layers[0].name ?? ""
  );

  const src: string = searchParam.get("src") ?? "";
  const paths: string = searchParam.get("paths") ?? "";
  const parentId: string = searchParam.get("parentId") ?? "";

  const { data } = useQuery<LayerPriority[]>({
    queryKey: [API_ROUTES.layerPriority.getAll(), { currentLayer, src }],
    queryFn: () => fetchLayerPriorityList({ query: { parentId } }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      deleteLayerPriority(Number(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.layerPriority.getAll()],
      });
    },
  });

  // Effect to handle navigation based on the current layer and paths
  useEffect(() => {
    if (!(currentLayer && paths)) {
      navigate(
        `${routes.layerPriority()}?layer=${layers[0].name}&paths=/${
          layers[0].name
        }`
      );
    }

    if (!currentLayer) {
      navigate(
        `${routes.layerPriority()}?layer=${layers[0].name}&paths=/${
          layers[0].name
        }`
      );
    }

    if (paths === "/") {
      navigate(
        `${routes.layerPriority()}?layer=${layers[0].name}&paths=/${
          layers[0].name
        }`
      );
    }
  }, [currentLayer, paths, navigate, routes]);

  // Effect to update `currentLayer` when the `layers` array changes or if `currentLayer` is empty
  useEffect(() => {
    if (layers && layers.length > 0 && currentLayer.length <= 0) {
      setCurrentLayer(layers[0].name);
    }
  }, [layers]);

  // Effect to set `currentLayer` from the search parameters
  useEffect(() => {
    setCurrentLayer(searchParam.get("layer"));
  }, [searchParam]);

  const handleDeleteButtonClick = (data: LayerPriority) => {
    setCurrentData(data);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (currentData) {
      await deleteMutation.mutateAsync(String(currentData.id));
    }
    setIsDeleteModalOpen(false);
  };

  const getCreateButton = () => {
    return (
      <CLink
        to={{
          pathname: routes.layerPriorityCreate(),
          search: `?layer=${
            currentLayer ? currentLayer.toLowerCase() : ""
          }&paths=${paths}/create-${currentLayer}${
            parentId ? "&parentId=" + parentId : ""
          }`,
        }}
        className="py-3 px-10 bg-c-primary rounded-xl text-base text-c-white hover:bg-c-hover capitalize"
      >
        Create {currentLayer}
      </CLink>
    );
  };

  const getEditButton = (id: string, slug: string) => {
    return (
      <CLink
        to={{
          pathname: routes.layerPriorityEdit(id),
          search: `?layer=${
            currentLayer ? currentLayer.toLowerCase() : ""
          }&paths=${paths}/${slug}/edit-${currentLayer}`,
        }}
      >
        <Button tabIndex={-1} variant="ghost">
          <RiEditFill className="text-blue-400 !w-[20px] !h-[20px]" />
        </Button>
      </CLink>
    );
  };

  const getDeleteButton = (data: LayerPriority) => {
    return (
      <Button variant="ghost" onClick={() => handleDeleteButtonClick(data)}>
        <MdDelete className="text-c-secondary !w-[20px] !h-[20px]" />
      </Button>
    );
  };

  const config = {
    toolbar: {
      viewOptions: false,
      getCreateButton,
    },
  };

  const getColumns = (
    getEditButton: (id: string, slug: string) => JSX.Element,
    getDeleteButton: (data: LayerPriority) => JSX.Element
  ): ColumnDef<LayerPriority>[] => {
    return [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          if (!isLastLayer(layers, currentLayer)) {
            console.log(currentLayer);
            return (
              <CLink
                className="hover:underline hover:text-c-primary"
                to={{
                  pathname: routes.layerPriority(),
                  search: `?src=${getSlug(
                    row.original.name
                  )}&paths=${paths}/${getSlug(row.original.name)}$nextLayer=${
                    getLayersArr(layers)[
                      getNextLayer(
                        layers,
                        getSlug(row.original.layer.name).toLowerCase()
                      )
                    ]
                  }$parentId=${row.original.selfParentId}&layer=${
                    getLayersArr(layers)[
                      getNextLayer(layers, currentLayer.toLowerCase())
                    ]
                  }&parentId=${row.original.id}`,
                }}
              >
                {row.original.name}
              </CLink>
            );
          } else {
            return <p className="">{row.original.name}</p>;
          }
        },
      },
      {
        accessorKey: "layer",
        header: "Layer",
        cell: ({ row }) => <span>{row.original.layer?.name}</span>,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => <span>{row.original.priority?.name}</span>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {getEditButton(row.original.id, getSlug(row.original.name))}
            {getDeleteButton(row.original)}
          </div>
        ),
      },
    ];
  };

  const columns = getColumns(getEditButton, getDeleteButton);

  return (
    <div>
      <div>
        <DataTable data={data ?? []} columns={columns} config={config} />
        <DeleteConfirmDialog
          src={currentLayer}
          data={currentData}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      </div>
    </div>
  );
};

export default LayerPriorityTable;
