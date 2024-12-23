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
import { CBaseSelect } from "@/components/custom/c-select"
import { useLinkRoutes } from "@/lib/route"
import useSearchParams from "@/hooks/use-search-params"
import { create } from "@/services/apis/layer-priority"
import { useNavigate } from "react-router"
import { LAYERS } from "@/mock/layer"
import { data as priorities } from "@/mock/priority"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    layer: z.string().min(2, {
        message: "layer must be at least 2 characters.",
    }),
    priority: z.string().min(2, {
        message: "priority must be at least 2 characters.",
    })
})

export function LayerPriorityEditForm({ defaultValues }: { defaultValues: object }) {
    const routes = useLinkRoutes()
    const navigate = useNavigate()
    const searchParam = useSearchParams()
    const layer: string = searchParam.get('layer') ?? 'continent'
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
            navigate(routes.layerPriority())
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="text-xl font-semibold capitalize">{layer} Information</h3>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <CFormLabel className="!text-black capitalize">{layer} Name</CFormLabel>
                            <FormControl>
                                <CInput.Base placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="layer"
                    render={({ field }) => (
                        <FormItem>
                            <CFormLabel className="!text-black">Layer</CFormLabel>
                            <FormControl>
                                <CBaseSelect items={LAYERS} disabled placeholder="Select Your Layer" onValueChange={field.onChange} defaultValue={field.value} />
                            </FormControl>
                            <FormMessage className="!text-sm inline-block !mt-[2px]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <CFormLabel className="!text-black">Priority</CFormLabel>
                            <FormControl>
                                <CBaseSelect items={priorities} placeholder="Select Your Priority" onValueChange={field.onChange} defaultValue={field.value} />
                            </FormControl>
                            <FormMessage className="!text-sm inline-block !mt-[2px]" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 justify-end">
                    <CButton styleType="cancel" type="button" className=" " onClick={() => form.reset()}>Cancel</CButton>
                    <CButton loading={updating} disabled={form.formState.isDirty && form.formState.isValid === false} styleType="create" type="submit">Create</CButton>
                </div>
            </form>
        </Form>
    )
}
