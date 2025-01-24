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
import { createServiceArea } from '@/services/actions/service-area'; // Updated to service area service
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Schema for form validation using Zod
const formSchema = z.object({
   name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
   }),
   serviceLayerId: z.string().min(1, {
      message: 'Layer must be at least 1 characters.',
   }),
   parentId: z.string().min(1, {
      message: 'Parent Service Area Id must be at least 1 characters.',
   }),
});

// Type inference for the form schema
type ServiceAreaFormSchema = z.infer<typeof formSchema>; // Updated type for Service Area

// Props type for the component
interface ServiceAreaCreateFormProps {
   onCreateSuccess: () => void;
}

export function ServiceAreaCreateForm({
   layers,
   onCreateSuccess,
}: Readonly<ServiceAreaCreateFormProps>) {
   const searchParam = useSearchParams();

   // Mutation for creating a service area
   const createMutation: UseMutationResult<
      unknown,
      { message: string },
      ServiceAreaFormSchema
   > = useMutation({
      mutationFn: createServiceArea, // Updated to use createServiceArea
      onError: error => {
         form.setError('name', { type: 'manual', message: error.message });
      },
      onSuccess: () => {
         form.reset({
            name: '',
            serviceLayerId: '',
            parentId: searchParam.get('parentId') ?? 'null',
         });
         onCreateSuccess();
      },
   });

   // Define the form with validation and default values
   const form: UseFormReturn<ServiceAreaFormSchema> =
      useForm<ServiceAreaFormSchema>({
         resolver: zodResolver(formSchema),
         defaultValues: {
            name: '',
            serviceLayerId: '',
            parentId: searchParam.get('parentId') ?? 'null',
         },
      });

   // Submit handler
   async function onSubmit(values: ServiceAreaFormSchema) {
      createMutation.mutate({
         name: values.name,
         parentId: Number(searchParam.get('parentId')),
         serviceLayerId: Number(values.serviceLayerId),
      });
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <h3 className='text-xl font-semibold'>Service Area Information</h3>
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
               name='serviceLayerId'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>Layer</CFormLabel>
                     <FormControl>
                        <CBaseSelect
                           items={layers}
                           placeholder='Select Your Layer'
                           onValueChange={field.onChange}
                           value={field.value}
                           defaultValue={field.value}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* <FormField
               control={form.control}
               name='parentId'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>
                        Service Area
                     </CFormLabel>
                     <FormControl>
                        <CBaseSelect
                           items={[
                              ...serviceAreas,
                              { id: null, name: 'Top level Service Area' },
                           ]}
                           placeholder='Select Your Service Area'
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            /> */}
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
                  styleType='create'
                  type='submit'>
                  Create
               </CButton>
            </div>
         </form>
      </Form>
   );
}
