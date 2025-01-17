import ListEmpty from "@/assets/images/list-empty.png";
import CInput from "@/components/custom/c-input";
import CLink from "@/components/custom/c-link";
import DeleteConfirmDialog from "@/components/layout/dialogs/delete-confirm-dialog";
import Loading from "@/components/layout/loading";
import { DataTablePagination } from "@/components/layout/table/data-table-pagination";
import { PureDataTable } from "@/components/layout/table/pure-data-table";
import { Button } from "@/components/ui/button";
import { API_ROUTES } from "@/lib/constants";
import { useLinkRoutes } from "@/lib/route";
import { queryClient } from "@/main";
import { deletePriority, fetchPriorityList } from "@/services/actions/priority";
import { Priority } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

const PriorityTable: React.FC = () => {
  const routes = useLinkRoutes();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Priority | null>(null);
  const src = "priority";

  const { data, isLoading } = useQuery<Priority[]>({
    queryKey: [API_ROUTES.priority.getAll()],
    queryFn: fetchPriorityList,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePriority,
    onError: () => {
      console.error("Error deleting priority.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.priority.getAll()],
      });
    },
  });

  const handleDeleteButtonClick = (data: Priority) => {
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
        to={routes.priorityCreate()}
        className="py-3 px-10 bg-c-primary rounded-xl text-base text-c-white hover:bg-c-hover capitalize"
      >
        Create {src}
      </CLink>
    );
  };

  const getEditButton = (id: string) => {
    return (
      <CLink to={routes.priorityEdit(id)}>
        <Button tabIndex={-1} variant="ghost">
          <RiEditFill className="text-blue-400 !w-[20px] !h-[20px]" />
        </Button>
      </CLink>
    );
  };

  const getDeleteButton = (data: Priority) => {
    return (
      <Button variant="ghost" onClick={() => handleDeleteButtonClick(data)}>
        <MdDelete className="text-c-secondary !w-[20px] !h-[20px]" />
      </Button>
    );
  };

  const getColumns = (
    getEditButton: (id: string) => JSX.Element,
    getDeleteButton: (data: Priority) => JSX.Element
  ): ColumnDef<Priority>[] => {
    const columns: ColumnDef<Priority>[] = [
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

  const table = useReactTable<any>({
    data: data ?? [],
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const isFiltered =
    table.getState().columnFilters.filter((each) => each.id === "name").length >
    0;

    return (
      <div>
        <div>
          {/* {isLoading && <Loading />} */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CInput.SearchInput
                placeholder="Search..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="h-[50px] w-[150px] lg:w-[250px] xl:w-[380px]"
              />
              {isFiltered && (
                <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                  className="h-8 px-2 lg:px-3"
                >
                  Reset
                  <X />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {getCreateButton()}
            </div>
          </div>
          <div className="mb-2">
            {isLoading && (
              <div className="p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-md">
                <Loading />
              </div>
            )}
            {!isLoading && data && (
              <>
                <div className={`${data.length <= 0 && "hidden"}`}>
                  <PureDataTable columns={columns} table={table} />
                </div>
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
              </>
            )}
          </div>
          <DataTablePagination table={table} />
          <DeleteConfirmDialog
            src={src}
            data={currentData}
            isDeleteModalOpen={isDeleteModalOpen}
            isDeleting={deleteMutation.isPending}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    );
};

export default PriorityTable;
