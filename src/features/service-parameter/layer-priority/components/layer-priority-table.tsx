import { DataTable } from "@/components/layout/table/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { RiEditFill } from "react-icons/ri";
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { Link } from "@/i18n/routing"
import ListEmpty from "@/assets/images/list-empty.png"
import DeleteConfirmDialog from "@/components/layout/dialogs/delete-confirm-dialog"
import { getNextLayer } from "@/lib/utils"
import { useLinkRoutes } from "@/lib/route";
import { useNavigate } from "react-router";
import { getAll } from "@/services/apis/layer-priority";
import { getLayersArr } from "@/mock/layer";
import useSearchParams from "@/hooks/use-search-params";

const LayerPriorityTable = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const routes = useLinkRoutes()
    const searchParam = useSearchParams()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [currentData, setCurrentData] = useState<any>(null)
    const layer: any = searchParam.get('layer') ?? ''
    const src: string = searchParam.get('src') ?? ''
    const paths: any = searchParam.get('paths')

    useEffect(() => {
        if (!(layer && paths)) {
            navigate(`${routes.layerPriority()}?layer=continent&paths=/continent`)
        }
    }, [])

    const handleDeleteButtonClick = (data: object) => {
        setCurrentData(data)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = () => {
        console.log('delete data')
        setIsDeleteModalOpen(false)
    }

    useEffect(() => {
        if ((layer == 'undefined' && paths == 'undefined')) {
            navigate(`${routes.layerPriority()}?layer=continent&paths=/continent`)
        }

        const getData = async () => {
            const { data } = await getAll({ query: { layer, src } })
            setData(data)
            console.log(data)
        }

        getData()
    }, [searchParam])


    const getCreateButton = () => {
        return <Link to={{ pathname: routes.layerPriorityCreate(), search: `?layer=${layer.toLowerCase()}&paths=${paths}/create-${layer}` }} className="py-3 px-10 bg-c-primary rounded-xl text-base text-c-white hover:bg-c-hover capitalize" > Create {layer}</Link>
    }


    const getEditButton = (id: string, slug: string) => {
        return <Link to={{ pathname: routes.layerPriorityEdit(id), search: `?layer=${layer.toLowerCase()}&paths=${paths}/${slug}/edit-${layer}` }}><Button variant="ghost"><RiEditFill className="text-blue-400 !w-[20px] !h-[20px]" /></Button></Link>
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
                cell: ({ row }) => {
                    return <Link className="hover:underline hover:text-c-primary" to={{
                        pathname: routes.layerPriority(),
                        search: `?src=${row.original?.slug}&paths=${paths}/${row.original.slug}&layer=${getLayersArr()[getNextLayer(layer.toLowerCase())]}`
                    }}> {row.original.name}</Link >
                }
            },
            {
                accessorKey: "layer",
                header: "Layer",

                cell: ({ row }) => {
                    return <span>{row.original.layer?.name}</span>
                }
            },
            {
                accessorKey: "priority",
                header: "Priority",
                cell: ({ row }) => {
                    return <span>{row.original.priority?.name}</span>
                }
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => {
                    return <div className="flex gap-2">
                        {getEditButton(row.original.id, row.original?.slug)}
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
                {
                    data && (
                        <div className={`${data.length <= 0 && 'hidden'}`}>
                            <DataTable data={data} columns={columns} config={config} />
                        </div>
                    )
                }
                <DeleteConfirmDialog src={layer} data={currentData} isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} handleDelete={handleDelete} />
            </div>
        </div>
    )
}

export default LayerPriorityTable