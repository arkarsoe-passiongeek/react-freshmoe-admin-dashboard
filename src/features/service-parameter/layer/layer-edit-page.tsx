import { LayerEditForm } from "./components/layer-edit-form"

const LayerEditPage = () => {
    return (
        <div className="bg-c-white border p-10 rounded-md max-w-3xl"><LayerEditForm defaultValues={{ name: 'test-one' }} /></div>
    )
}

export default LayerEditPage