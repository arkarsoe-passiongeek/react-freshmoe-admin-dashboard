import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Loading from '@/components/layouts/loading';
import CButton from '@/components/ui-custom/c-button';
import CFormLabel from '@/components/ui-custom/c-form-label';
import CInput from '@/components/ui-custom/c-input/c-input';
import { Checkbox } from '@/components/ui/checkbox';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useServiceType } from '../api/get-service-type';
import {
   updateServiceTypeInputSchema,
   useUpdateServiceType,
} from '../api/update-service-type';

type FormData = z.infer<typeof updateServiceTypeInputSchema>;

type UpdateServiceTypeProps = {
   serviceTypeId: string;
};

export default function ServiceTypeUpdateForm({
   serviceTypeId,
}: Readonly<UpdateServiceTypeProps>) {
   const serviceTypeQuery = useServiceType({ serviceTypeId });
   const navigate = useNavigate();

   const { addNotification } = useNotifications();

   const updateServiceTypeMutation = useUpdateServiceType({
      mutationConfig: {
         onError: error => {
            form.setError('name', { type: 'manual', message: error.message });
         },
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'ServiceType Updated',
            });
            navigate(paths.serviceType.path);
         },
      },
   });

   // 1. Define your form.
   const form = useForm<FormData>({
      resolver: zodResolver(updateServiceTypeInputSchema),
      defaultValues: {
         name: '',
      },
   });

   // 2. Define a submit handler.
   const onSubmit: SubmitHandler<FormData> = values => {
      updateServiceTypeMutation.mutate({ data: values, serviceTypeId });
   };

   const serviceType = serviceTypeQuery.data?.data;

   useEffect(() => {
      if (serviceType) {
         form.reset({
            name: serviceType.name ?? '',
            consent: false,
         });
      }
   }, [serviceType]);

   if (serviceTypeQuery.isLoading) {
      return <Loading />;
   }

   return (
      <Form {...form}>
         <form
            aria-label='ServiceType Update Form'
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
               name='consent'
               render={({ field }) => (
                  <FormItem className='flex flex-col items-start space-x-3 space-y-3'>
                     <div className='flex gap-3 w-full'>
                        <FormControl>
                           <Checkbox
                              aria-label='consent'
                              className='border-primary'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                           />
                        </FormControl>

                        <div className='space-y-1 leading-none'>
                           <CFormLabel className='text-sm 2xl:text-sm text-c-contrast font-light'>
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
                  variant='outline'
                  type='button'
                  onClick={() => form.reset()}>
                  Cancel
               </CButton>
               <CButton
                  size='md'
                  loading={updateServiceTypeMutation.isPending}
                  type='submit'>
                  Edit
               </CButton>
            </div>
         </form>
      </Form>
   );
}
