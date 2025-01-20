import CButton from '@/components/custom/c-button';
import CFormLabel from '@/components/custom/c-form-label';
import CInput from '@/components/custom/c-input';
import { CBaseSelect } from '@/components/custom/c-select';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import useSearchParams from '@/hooks/use-search-params';
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { transformObjectWithId } from '@/lib/utils';
import { queryClient } from '@/main';
import { updateLayerPriority } from '@/services/actions/layer-priority';
import { Layer, LayerPriority, Priority, UpdateLayerPriority } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

// Define the schema validation
const formSchema = z.object({
   name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
   }),
   layer: z.string().min(1, {
      message: 'Layer must be at least 1 characters.',
   }),
   priority: z.string().min(1, {
      message: 'Priority must be at least 1 characters.',
   }),
});

export function LayerPriorityEditForm({
   defaultValues,
   layers,
   priorities,
}: Readonly<{
   defaultValues: LayerPriority;
   layers: Layer[];
   priorities: Priority[];
}>) {
   const routes = useLinkRoutes();
   const navigate = useNavigate();
   const searchParam = useSearchParams();
   const layer: string = searchParam.get('layer') ?? 'continent';

   // State for tracking if the form has mounted
   const [isMounted, setIsMounted] = useState(false);

   // 1. Define your form.
   const form = useForm<LayerPriority>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues,
   });

   // 2. Define the mutation for creating a new layer priority.
   const updateMutation = useMutation({
      mutationFn: ({
         values,
         id,
      }: {
         values: UpdateLayerPriority;
         id: string;
      }) => updateLayerPriority(values, Number(id)),
      onError: error => {
         form.setError('name', {
            type: 'manual',
            message: error?.message ?? 'An error occurred',
         });
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.layerPriority.getAll()],
         });
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.layerPriority.view(defaultValues.id)],
         });
         navigate(routes.layerPriority());
      },
   });

   // 3. Define a submit handler.
   const onSubmit: SubmitHandler<LayerPriority> = async values => {
      if (defaultValues?.id) {
         updateMutation.mutate({
            values: {
               name: values.name,
               layerId: Number(values.layer),
               priorityId: Number(values.priority),
            },
            id: String(defaultValues.id),
         });
      }
   };

   // UseEffect to reset form when defaultValues change and transform values as needed
   useEffect(() => {
      const data = transformObjectWithId(defaultValues);

      // Reset the form with the transformed data
      form.reset({ ...data });
      setIsMounted(true);
   }, [defaultValues, form]); // Add form as dependency to ensure proper reset

   return (
      <>
         {isMounted && (
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-5'>
                  <h3 className='text-xl font-semibold capitalize'>
                     {layer} Information
                  </h3>

                  {/* Name Field */}
                  <FormField
                     control={form.control}
                     name='name'
                     render={({ field }) => (
                        <FormItem>
                           <CFormLabel className='!text-black capitalize'>
                              {layer} Name
                           </CFormLabel>
                           <FormControl>
                              <CInput.Base placeholder='Name' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Layer Field */}
                  <FormField
                     control={form.control}
                     name='layer'
                     render={({ field }) => (
                        <FormItem>
                           <CFormLabel className='!text-black'>
                              Layer
                           </CFormLabel>
                           <FormControl>
                              <CBaseSelect
                                 items={layers}
                                 disabled
                                 placeholder='Select Your Layer'
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              />
                           </FormControl>
                           <FormMessage className='!text-sm inline-block !mt-[2px]' />
                        </FormItem>
                     )}
                  />

                  {/* Priority Field */}
                  <FormField
                     control={form.control}
                     name='priority'
                     render={({ field }) => (
                        <FormItem>
                           <CFormLabel className='!text-black'>
                              Priority
                           </CFormLabel>
                           <FormControl>
                              <CBaseSelect
                                 items={priorities}
                                 placeholder='Select Your Priority'
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              />
                           </FormControl>
                           <FormMessage className='!text-sm inline-block !mt-[2px]' />
                        </FormItem>
                     )}
                  />

                  {/* Action Buttons */}
                  <div className='flex gap-4 justify-end'>
                     <CButton
                        styleType='cancel'
                        type='button'
                        onClick={() => form.reset()}>
                        Cancel
                     </CButton>
                     <CButton
                        loading={updateMutation.isPending}
                        disabled={form.formState.disabled}
                        styleType='update'
                        type='submit'>
                        Update
                     </CButton>
                  </div>
               </form>
            </Form>
         )}
      </>
   );
}
