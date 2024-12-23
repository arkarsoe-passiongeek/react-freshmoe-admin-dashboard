import { isObject } from "@/lib/utils"
import { get } from "@/services/apis/layer-priority"
import { LayerPriorityEditForm } from "./components/layer-priority-edit-form"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useLinkRoutes } from "@/lib/route"

const LayerPriorityEditPage = () => {
    const { id }: any = useParams()
    const [defaultData, setDefaultData] = useState({})
    const navigate = useNavigate()
    const routes = useLinkRoutes()


    const getData = async () => {
        const defaultValues: any = {}
        const res = (await get({ id })).data
        Object.keys(res).map(each => {
            if (isObject(res[each])) {
                return defaultValues[each] = res[each].id
            }
            defaultValues[each] = res[each]
        })

        setDefaultData(defaultValues)
    }

    useEffect(() => {
        if (!id) {
            navigate(routes.layerPriority())
        }

        getData()
    }, [id])

    return (
        <div className="bg-c-white border p-10 rounded-md max-w-3xl">{
            Object.keys(defaultData).length > 0 && (<LayerPriorityEditForm defaultValues={defaultData} />)
        }</div>
    )
}

export default LayerPriorityEditPage