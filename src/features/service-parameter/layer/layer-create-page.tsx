import CreateSuccessDialog from "@/components/layout/dialogs/create-success-dialog"
import { useState } from "react"
import { LayerCreateForm } from "./components/layer-create-form"
import { useIntl } from "react-intl"
import { getRoutes } from "@/lib/route"

const LayerCreatePage = () => {
    const [createSuccessModalOpen, setCreateSuccessModalOpen] = useState(false)
    const { locale } = useIntl()
    const routes = getRoutes(locale)

    const onCreateSuccess = () => {
        setCreateSuccessModalOpen(true)
    }

    return (
        <div className="bg-c-white border p-10 rounded-md max-w-3xl">
            <LayerCreateForm onCreateSuccess={onCreateSuccess} />
            <CreateSuccessDialog src="Layer" createSuccessModalOpen={createSuccessModalOpen} setCreateSuccessModalOpen={setCreateSuccessModalOpen} redirectRoute={routes.layer()} />
        </div>
    )
}

export default LayerCreatePage