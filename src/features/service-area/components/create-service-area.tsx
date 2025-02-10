import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import CButton from '@/components/ui-custom/c-button';
import CFormLabel from '@/components/ui-custom/c-form-label';
import CInput from '@/components/ui-custom/c-input/c-input';
import { CBaseSelect } from '@/components/ui-custom/c-select';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useLayers } from '@/features/layer/api/get-layers';
import {
   createServiceAreaInputSchema,
   useCreateServiceArea,
} from '../api/create-service-area';

type FormData = z.infer<typeof createServiceAreaInputSchema>;

interface ServiceAreaCreateFormProps {
   parentId: string;
   onCreateSuccess: () => void;
}

export default function ServiceAreaCreateForm({
   parentId,
   onCreateSuccess,
}: Readonly<ServiceAreaCreateFormProps>) {
   const layerQuery = useLayers({});

   const layers = layerQuery?.data?.data ?? [];

   const { addNotification } = useNotifications();
   const createServiceAreaMutation = useCreateServiceArea({
      parentId,
      mutationConfig: {
         onError: error => {
            form.setError('name', { type: 'manual', message: error.message });
         },
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'Discussion Created',
            });
            onCreateSuccess();
            form.reset();
         },
      },
   });

   // 1. Define your form.
   const form = useForm<FormData>({
      resolver: zodResolver(createServiceAreaInputSchema),
      defaultValues: {
         name: '',
         serviceLayerId: '',
         parentId: parentId,
      },
   });

   // 2. Define a submit handler.
   const onSubmit: SubmitHandler<FormData> = values => {
      createServiceAreaMutation.mutate({ data: values });
   };

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
                  variant='outline'
                  type='button'
                  onClick={() => form.reset()}>
                  Cancel
               </CButton>
               <CButton
                  size='md'
                  loading={createServiceAreaMutation.isPending}
                  type='submit'>
                  Create
               </CButton>
            </div>
         </form>
      </Form>
   );
}
