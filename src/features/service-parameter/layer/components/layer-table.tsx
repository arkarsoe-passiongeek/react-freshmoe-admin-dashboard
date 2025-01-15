import { DataTable } from "@/components/layout/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { RiEditFill } from "react-icons/ri";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import ListEmpty from "@/assets/images/list-empty.png";
import DeleteConfirmDialog from "@/components/layout/dialogs/delete-confirm-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLinkRoutes } from "@/lib/route";
import CLink from "@/components/custom/c-link";
import { deleteLayer, fetchLayerList } from "@/services/actions/layer";
import { API_ROUTES } from "@/lib/constants";
import { Layer } from "@/types";
import { queryClient } from "@/main";

const LayerTable: React.FC = () => {
  const routes = useLinkRoutes();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Layer | null>(null);
  const src = "layer";

  const { data } = useQuery<Layer[]>({
    queryKey: [API_ROUTES.layer.getAll()],
    queryFn: () => fetchLayerList(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLayer,
    onError: () => {
      // form.setError('name', { type: 'manual', message: error.message })
    },
    onSuccess: () => {
      // Boom baby!
      // navigate(routes.role())
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.layer.getAll()],
      });
    },
  });

  const handleDeleteButtonClick = (data: Layer) => {
    setCurrentData(data);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (currentData) {
        await deleteMutation.mutateAsync(currentData.id);
      }
    } finally {
      setIsDeleteModalOpen(false);
    }
  };
  const getCreateButton = () => {
    return (
      <CLink
        to={routes.layerCreate()}
        className="py-3 px-10 bg-c-primary rounded-xl text-base text-c-white hover:bg-c-hover capitalize"
      >
        Create {src}
      </CLink>
    );
  };

  const getEditButton = (id: string) => {
    return (
      <CLink to={routes.layerEdit(id)}>
        <Button tabIndex={-1} variant="ghost">
          <RiEditFill className="text-blue-400 !w-[20px] !h-[20px]" />
        </Button>
      </CLink>
    );
  };

  const getDeleteButton = (data: Layer) => {
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
    getEditButton: (id: string) => JSX.Element,
    getDeleteButton: (data: Layer) => JSX.Element
  ): ColumnDef<Layer>[] => {
    const columns: ColumnDef<Layer>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
              {getEditButton(String(row.original.id))}
              {getDeleteButton(row.original)}
            </div>
          );
        },
      },
    ];
    return columns;
  };

  const columns = getColumns(getEditButton, getDeleteButton);

  return (
    <div>
      <div>
        <div
          className={`p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-md ${
            data && data.length > 0 && "hidden"
          }`}
        >
          <img src={ListEmpty} width={135} height={160} alt="logo" />
          <h3 className="font-semibold text-2xl text-c-border-stroke">
            Your {src} List is empty
          </h3>
        </div>
        {data && (
          <div className={`${data.length <= 0 && "hidden"}`}>
            <DataTable data={data} columns={columns} config={config} />
          </div>
        )}
        <DeleteConfirmDialog
          src={src}
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

export default LayerTable;
