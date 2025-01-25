import CButton from '@/components/custom/c-button';
import CFormLabel from '@/components/custom/c-form-label';
import CInput from '@/components/custom/c-input';
import { CBaseSelect } from '@/components/custom/c-select';
import { Checkbox } from '@/components/ui/checkbox';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { API_ROUTES } from '@/lib/constants';
import { useLinkRoutes } from '@/lib/route';
import { transformObjectWithId } from '@/lib/utils';
import { queryClient } from '@/main';
import { updateServiceArea } from '@/services/actions/service-area'; // Updated to service area service
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
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
   check: z.boolean().refine((val) => val === true, {
      message: "Check must be true.",
    }),
});

// Type inference for the form schema
type ServiceAreaFormSchema = z.infer<typeof formSchema>; // Updated type for Service Area

// Props type for the component
interface ServiceAreaEditFormProps {
   serviceAreaData: ServiceAreaFormSchema; // Added serviceAreaData prop to receive the current data
   onUpdateSuccess: () => void;
}

export function ServiceAreaEditForm({
   serviceAreaData, // Prop for pre-populated service area data
   layers,
   serviceAreas,
   defaultValues,
}: Readonly<ServiceAreaEditFormProps>) {
   const navigate = useNavigate();
   const routes = useLinkRoutes();

   // Mutation for updating a service area
   const updateMutation: UseMutationResult<
      unknown,
      { message: string },
      ServiceAreaFormSchema
   > = useMutation({
      mutationFn: values => updateServiceArea(values, defaultValues.id), // Updated to use updateServiceArea
      onError: error => {
         form.setError('name', { type: 'manual', message: error.message });
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.serviceArea.view(defaultValues.id)],
         });
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.serviceArea.getAll],
         });
         navigate(
            routes.serviceArea({
               search: `?parentId=${defaultValues.parentId}`,
            })
         );
      },
   });

   // Define the form with validation and default values (using serviceAreaData for default values)
   const form: UseFormReturn<ServiceAreaFormSchema> =
      useForm<ServiceAreaFormSchema>({
         resolver: zodResolver(formSchema),
         defaultValues: {
            name: '',
            serviceLayerId: '',
            parentId: 'null',
         }, // Using the passed serviceAreaData for default values
      });

   // Submit handler
   async function onSubmit(values: ServiceAreaFormSchema) {
      updateMutation.mutate({
         name: values.name,
         parentId: Number(values.parentId),
         serviceLayerId: Number(values.serviceLayerId),
      });
   }

   // UseEffect to reset form when defaultValues change and transform values as needed
   useEffect(() => {
      const data = transformObjectWithId(defaultValues);

      // Reset the form with the transformed data
      form.reset({ ...data });
   }, [defaultValues, form]); // Add form as dependency to ensure proper reset

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <h3 className='text-xl font-semibold'>
               Edit Service Area Information
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
            <FormField
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
                              ...serviceAreas.filter(
                                 each => each.id !== defaultValues.id
                              ),
                              { id: null, name: 'Top level Service Area' },
                           ]}
                           placeholder='Select Your Service Area'
                           onValueChange={field.onChange}
                           getValue={obj =>
                              `${obj.name} ${
                                 obj.serviceLayer
                                    ? '(' + obj.serviceLayer.name + ')'
                                    : ''
                              }`
                           }
                           value={field.value}
                           defaultValue={field.value}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='check'
               render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-x-3 space-y-3'>
                     <div className='flex gap-3 w-full'>
                        <FormControl>
                           <Checkbox
                              className='border-primary'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                           />
                        </FormControl>

                        <div className='space-y-1 leading-none'>
                           <CFormLabel className='text-sm text-c-contrast font-light'>
                              Are you sure you want to{' '}
                              <span className='text-primary'>Edit</span> it?
                           </CFormLabel>
                        </div>
                     </div>
                     <FormMessage className='!ml-0' />
                  </FormItem>
               )}
            />
            <div className='flex gap-4 justify-end'>
               <CButton
                  size='md'
                  styleType='cancel'
                  type='button'
                  onClick={() => form.reset()}>
                  Cancel
               </CButton>
               <CButton
                  size='md'
                  loading={updateMutation.isPending}
                  styleType='create'
                  type='submit'>
                  Edit
               </CButton>
            </div>
         </form>
      </Form>
   );
}
