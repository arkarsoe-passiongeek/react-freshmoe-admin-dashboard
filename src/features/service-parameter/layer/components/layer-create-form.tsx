import CButton from '@/components/custom/c-button';
import CFormLabel from '@/components/custom/c-form-label';
import CInput from '@/components/custom/c-input';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { createLayer } from '@/services/actions/layer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Schema for form validation using Zod
const formSchema = z.object({
   name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
   }),
});

// Type inference for the form schema
type LayerFormSchema = z.infer<typeof formSchema>;

// Props type for the component
interface LayerCreateFormProps {
   onCreateSuccess: () => void;
}

export function LayerCreateForm({
   onCreateSuccess,
}: Readonly<LayerCreateFormProps>) {
   // Mutation for creating a layer
   const createMutation: UseMutationResult<
      unknown,
      { message: string },
      LayerFormSchema
   > = useMutation({
      mutationFn: createLayer,
      onError: error => {
         form.setError('name', { type: 'manual', message: error.message });
      },
      onSuccess: () => {
         form.reset();
         onCreateSuccess();
      },
   });

   // Define the form with validation and default values
   const form: UseFormReturn<LayerFormSchema> = useForm<LayerFormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',
      },
   });

   // Submit handler
   async function onSubmit(values: LayerFormSchema) {
      createMutation.mutate(values);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <h3 className='text-xl font-semibold'>Layer Information</h3>
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
            <div className='flex gap-4 justify-end'>
               <CButton
                  size='md'
                  styleType='cancel'
                  type='button'
                  className=' '
                  onClick={() => form.reset()}>
                  Cancel
               </CButton>
               <CButton
                  size='md'
                  loading={createMutation.isPending}
                  disabled={
                     form.formState.isDirty && form.formState.isValid === false
                  }
                  styleType='create'
                  type='submit'>
                  Create
               </CButton>
            </div>
         </form>
      </Form>
   );
}
