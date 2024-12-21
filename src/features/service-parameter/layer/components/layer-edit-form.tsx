import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import CInput from "@/components/custom/c-input"
import CFormLabel from "@/components/custom/c-form-label"
import CButton from "@/components/custom/c-button"
import { useState } from "react"
import { useLinkRoutes } from "@/lib/route"
import { create } from "@/services/apis/layer"
import { useNavigate } from "react-router"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    })
})

export function LayerEditForm({ defaultValues }: { defaultValues: object }) {
    const routes = useLinkRoutes()
    const navigate = useNavigate()
    const [updating, setUpdating] = useState(false)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setUpdating(true)
        setTimeout(() => {
            navigate(routes.layer())
            setUpdating(false)
        }, 2000);
        const res: any = await create(values)

        if (res.error?.status === 422) {
            // for (let key in error.data) {
            //     form.setError(key as any, { type: 'manual', message: error.data[key][0] })
            // }
            form.setError('name', { type: 'manual', message: 'Credentials are not valid' })
        } else {
            console.log(res)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h3 className="text-xl font-semibold">Layer Information</h3>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <CFormLabel className="!text-black">Name</CFormLabel>
                            <FormControl>
                                <CInput.Base placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 justify-end">
                    <CButton styleType="cancel" type="button" onClick={() => form.reset()} > Cancel</CButton>
                    <CButton loading={updating} styleType="update" type="submit" className={`${(form.formState.isDirty && form.formState.isValid === false) ? 'bg-c-contrast hover:bg-c-contrast' : ''}`}>Update</CButton>
                </div>
            </form>
        </Form >
    )
}
