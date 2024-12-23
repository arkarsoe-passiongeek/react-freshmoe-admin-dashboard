import CreateSuccessDialog from "@/components/layout/dialogs/create-success-dialog"
import { useLinkRoutes } from "@/lib/route"
import { useState } from "react"
import { LayerPriorityCreateForm } from "./components/layer-priority-create-form"

const LayerPriorityCreatePage = () => {
    const [createSuccessModalOpen, setCreateSuccessModalOpen] = useState(false)
    const routes = useLinkRoutes()

    const onCreateSuccess = () => {
        setCreateSuccessModalOpen(true)
    }

    return (
        <div className="bg-c-white border p-10 rounded-md max-w-3xl">
            <LayerPriorityCreateForm onCreateSuccess={onCreateSuccess} />
            <CreateSuccessDialog src="Layer Priority" createSuccessModalOpen={createSuccessModalOpen} setCreateSuccessModalOpen={setCreateSuccessModalOpen} redirectRoute={routes.layerPriority()} />
        </div>
    )
}

export default LayerPriorityCreatePage