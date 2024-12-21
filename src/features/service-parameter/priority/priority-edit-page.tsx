import { PriorityEditForm } from "./components/priority-edit-form"

const PriorityEditPage = () => {
    return (
        <div className="bg-c-white border p-10 rounded-md max-w-3xl"><PriorityEditForm defaultValues={{ name: 'test-one' }} /></div>
    )
}

export default PriorityEditPage