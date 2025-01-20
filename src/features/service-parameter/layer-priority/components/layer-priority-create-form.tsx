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
import { createLayerPriority } from '@/services/actions/layer-priority';
import { Layer, Priority } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Schema for form validation using Zod
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

// Type inference for the form schema
type LayerPriorityFormSchema = z.infer<typeof formSchema>;

// Props type for the component
interface LayerPriorityCreateFormProps {
   onCreateSuccess: () => void;
   layers: Layer[];
   priorities: Priority[];
}

export function LayerPriorityCreateForm({
   onCreateSuccess,
   layers,
   priorities,
}: LayerPriorityCreateFormProps) {
   const [submitting, setSubmitting] = useState(false);
   const queryClient = useQueryClient();
   const searchParam = useSearchParams();

   // Define the form with validation and default values
   const form: UseFormReturn<LayerPriorityFormSchema> =
      useForm<LayerPriorityFormSchema>({
         resolver: zodResolver(formSchema),
         defaultValues: {
            name: '',
            layer: '',
            priority: '',
         },
      });

   // Mutation for creating a layer priority
   const createMutation = useMutation({
      mutationFn: createLayerPriority,
      onError: error => {
         form.setError('name', { type: 'manual', message: error.message });
         setSubmitting(false);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.layerPriority.getAll()],
         });
         onCreateSuccess();
      },
   });

   // Submit handler
   async function onSubmit(values: LayerPriorityFormSchema) {
      setSubmitting(true);
      let newValues = {
         name: values.name,
         layerId: Number(values.layer),
         priorityId: Number(values.priority),
      };
      if (searchParam.get('parentId')) {
         newValues['selfParentId'] = Number(searchParam.get('parentId'));
      }
      createMutation.mutate(newValues);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <h3 className='text-xl font-semibold capitalize'>
               Create Layer Priority
            </h3>
            <FormField
               control={form.control}
               name='name'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>Name</CFormLabel>
                     <FormControl>
                        <CInput.Base placeholder='Name' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='layer'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>Layer</CFormLabel>
                     <FormControl>
                        <CBaseSelect
                           items={layers}
                           placeholder='Select Your Layer'
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='priority'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>Priority</CFormLabel>
                     <FormControl>
                        <CBaseSelect
                           items={priorities}
                           placeholder='Select Your Priority'
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className='flex gap-4 justify-end'>
               <CButton
                  styleType='cancel'
                  type='button'
                  onClick={() => form.reset()}>
                  Cancel
               </CButton>
               <CButton
                  loading={submitting}
                  disabled={form.formState.disabled}
                  styleType='create'
                  type='submit'>
                  Create
               </CButton>
            </div>
         </form>
      </Form>
   );
}
