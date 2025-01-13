import { DataTable } from "@/components/layout/table/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { RiEditFill } from "react-icons/ri";
import { useState } from "react"
import { MdDelete } from "react-icons/md";
import { Link } from "@/i18n/routing"
import ListEmpty from "@/assets/images/list-empty.png"
import DeleteConfirmDialog from "@/components/layout/dialogs/delete-confirm-dialog"
import { useLinkRoutes } from "@/lib/route";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/services/apis/priority";
import CLink from "@/components/custom/c-link";

const PriorityTable = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [currentData, setCurrentData] = useState<any>(null)
    const src = 'priority'
    const routes = useLinkRoutes()

    const { data } = useQuery({
        queryKey: [routes.layer()],
        queryFn: () => getAll(),
    })

    const handleDeleteButtonClick = (data: object) => {
        setCurrentData(data)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = () => {
        console.log('delete data')
        setIsDeleteModalOpen(false)
    }

    const getCreateButton = () => {
        return <CLink to={routes.priorityCreate()} className="py-3 px-10 bg-c-primary rounded-xl text-base text-c-white hover:bg-c-hover capitalize">Create {src}</CLink>
    }

    const getEditButton = (id: string) => {
        return <CLink to={routes.priorityEdit(id)}><Button tabIndex={-1} variant="ghost"><RiEditFill className="text-blue-400 !w-[20px] !h-[20px]" /></Button></CLink>
    }
    const getDeleteButton = (data: object) => {
        return <Button variant="ghost" onClick={() => handleDeleteButtonClick(data)}><MdDelete className="text-c-secondary !w-[20px] !h-[20px]" /></Button>
    }

    const config = {
        toolbar: {
            viewOptions: false,
            getCreateButton
        }
    }

    const getColumns = (getEditButton: any, getDeleteButton: any) => {
        const columns: ColumnDef<any>[] = [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => {
                    return <div className="flex gap-2">
                        {getEditButton(row.original.id)}
                        {getDeleteButton(row.original)}
                    </div>
                }
            },
        ]
        return columns
    }

    const columns = getColumns(getEditButton, getDeleteButton)

    return (
        <div>
            <div>
                <div className={`p-3 flex items-center justify-center bg-c-white flex-col h-[500px] rounded-md ${data && data.length > 0 && 'hidden'}`}>
                    <img src={ListEmpty} width={135} height={160} alt="logo" />
                    <h3 className="font-semibold text-2xl text-c-border-stroke">Your {src} List is empty</h3>
                </div>
                <div className={`${data && data.length <= 0 && 'hidden'}`}>
                    <DataTable data={data ?? []} columns={columns} config={config} />
                </div>
                <DeleteConfirmDialog src={src} data={currentData} isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} handleDelete={handleDelete} />
            </div>
        </div>
    )
}

export default PriorityTable