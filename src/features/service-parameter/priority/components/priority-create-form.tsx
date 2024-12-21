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
import { create } from "@/services/apis/priority"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    })
})

export function PriorityCreateForm({ onCreateSuccess }: any) {
    const [submitting, setSubmitting] = useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
        }, 2000);

        const res: any = await create(values)
        onCreateSuccess()
        if (res.error?.status === 422) {
            form.setError('name', { type: 'manual', message: 'Credentials are not valid' })
        } else {
            console.log(res)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="text-xl font-semibold">Priority Information</h3>
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
                    <CButton styleType="cancel" type="button" className=" " onClick={() => form.reset()}>Cancel</CButton>
                    <CButton loading={submitting} disabled={form.formState.isDirty && form.formState.isValid === false} styleType="create" type="submit">Create</CButton>
                </div>
            </form>
        </Form>
    )
}
