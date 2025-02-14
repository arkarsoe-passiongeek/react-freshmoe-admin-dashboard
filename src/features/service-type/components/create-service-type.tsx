import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import CButton from '@/components/ui-custom/c-button';
import CFormLabel from '@/components/ui-custom/c-form-label';
import CInput from '@/components/ui-custom/c-input/c-input';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import {
   createServiceTypeInputSchema,
   useCreateServiceType,
} from '../api/create-service-type';

type FormData = z.infer<typeof createServiceTypeInputSchema>;

interface ServiceTypeCreateFormProps {
   onCreateSuccess: () => void;
}

export default function ServiceTypeCreateForm({
   onCreateSuccess,
}: Readonly<ServiceTypeCreateFormProps>) {
   const { addNotification } = useNotifications();
   const createServiceTypeMutation = useCreateServiceType({
      mutationConfig: {
         onError: error => {
            form.setError('name', { type: 'manual', message: error.message });
         },
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'ServiceType Created',
            });
            onCreateSuccess();
            form.reset();
         },
      },
   });

   // 1. Define your form.
   const form = useForm<FormData>({
      resolver: zodResolver(createServiceTypeInputSchema),
      defaultValues: {
         name: '',
         code: '',
      },
   });

   // 2. Define a submit handler.
   const onSubmit: SubmitHandler<FormData> = values => {
      createServiceTypeMutation.mutate({ data: values });
   };

   return (
      <Form {...form}>
         <form
            aria-label='serviceType-create-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'>
            <h3 className='text-xl font-semibold'>ServiceType Information</h3>

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
               name='code'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>Code</CFormLabel>
                     <FormControl>
                        <CInput.Base placeholder='Code' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className='flex gap-4 justify-end'>
               <CButton
                  size='md'
                  variant='outline'
                  type='button'
                  onClick={() => form.reset()}>
                  Cancel
               </CButton>
               <CButton
                  size='md'
                  loading={createServiceTypeMutation.isPending}
                  type='submit'>
                  Create
               </CButton>
            </div>
         </form>
      </Form>
   );
}
