import CreateSuccessDialog from "@/components/layout/dialogs/create-success-dialog"
import { useLinkRoutes } from "@/lib/route"
import { useState } from "react"
import { PriorityCreateForm } from "./components/priority-create-form"

const PriorityCreatePage = () => {
    const [createSuccessModalOpen, setCreateSuccessModalOpen] = useState(false)
    const routes = useLinkRoutes()

    const onCreateSuccess = () => {
        setCreateSuccessModalOpen(true)
    }

    return (
        <div className="bg-c-white border p-10 rounded-md max-w-3xl">
            <PriorityCreateForm onCreateSuccess={onCreateSuccess} />
            <CreateSuccessDialog src="Priority" createSuccessModalOpen={createSuccessModalOpen} setCreateSuccessModalOpen={setCreateSuccessModalOpen} redirectRoute={routes.priority()} />
        </div>
    )
}

export default PriorityCreatePage