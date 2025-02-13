import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Loading from '@/components/layouts/loading';
import CButton from '@/components/ui-custom/c-button';
import CFormLabel from '@/components/ui-custom/c-form-label';
import CInput from '@/components/ui-custom/c-input/c-input';
import { CBaseSelect } from '@/components/ui-custom/c-select';
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
import { useLayers } from '@/features/layer/api/get-layers';
import useSearchParams from '@/hooks/use-search-params';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useServiceArea } from '../api/get-service-area';
import { useServiceAreasExcept } from '../api/get-service-areas-except';
import {
   updateServiceAreaInputSchema,
   useUpdateServiceArea,
} from '../api/update-service-area';

type FormData = z.infer<typeof updateServiceAreaInputSchema>;

type UpdateServiceAreaProps = {
   parentId: string;
   serviceAreaId: string;
};

export default function ServiceAreaUpdateForm({
   parentId,
   serviceAreaId,
}: Readonly<UpdateServiceAreaProps>) {
   const serviceAreasQuery = useServiceAreasExcept({ serviceAreaId });
   const serviceAreaQuery = useServiceArea({ serviceAreaId });
   const layerQuery = useLayers({});
   const navigate = useNavigate();
   const searchParam = useSearchParams();

   const { addNotification } = useNotifications();

   const updateServiceAreaMutation = useUpdateServiceArea({
      parentId,
      mutationConfig: {
         onError: error => {
            form.setError('name', { type: 'manual', message: error.message });
         },
         onSuccess: () => {
            addNotification({
               type: 'success',
               title: 'Layer Updated',
            });
            navigate(
               paths.serviceArea.path +
               `?parentId=${searchParam.get('parentId') ?? 'null'}`,
            );
         },
      },
   });

   // 1. Define your form.
   const form = useForm<FormData>({
      resolver: zodResolver(updateServiceAreaInputSchema),
      defaultValues: {
         name: '',
         serviceLayerId: '',
         parentId: 'null',
         consent: false,
      },
   });

   // 2. Define a submit handler.
   const onSubmit: SubmitHandler<FormData> = values => {
      updateServiceAreaMutation.mutate({ data: values, serviceAreaId });
   };

   const serviceArea = serviceAreaQuery.data?.data;
   const layers = layerQuery.data?.data;
   const serviceAreas = serviceAreasQuery.data?.data ?? [];

   useEffect(() => {
      if (serviceArea) {
         form.reset({
            name: serviceArea.name ?? '',
            parentId: serviceArea.parentId
               ? String(serviceArea.parentId)
               : 'null',
            serviceLayerId: serviceArea.serviceLayerId
               ? String(serviceArea.serviceLayerId)
               : '',
            consent: false
         });
      }
   }, [serviceArea, serviceAreaQuery.data]);

   if (serviceAreaQuery.isLoading) {
      return <Loading />;
   }

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
            {layers && (
               <FormField
                  control={form.control}
                  name='serviceLayerId'
                  render={({ field }) => (
                     <FormItem>
                        <CFormLabel className='!text-black'>Layer</CFormLabel>
                        <FormControl>
                           <CBaseSelect
                              items={layers ?? []}
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
            )}
            {serviceArea && serviceAreas && (
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
                                    each => each.id !== serviceArea.id,
                                 ),
                                 { id: 'null', name: 'Top level Service Area' },
                              ]}
                              placeholder='Select Your Service Area'
                              onValueChange={field.onChange}
                              getValue={obj =>
                                 `${obj.name} ${obj.serviceLayer
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
            )}
            <FormField
               control={form.control}
               name='consent'
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
                  variant='outline'
                  type='button'
                  onClick={() => form.reset()}>
                  Cancel
               </CButton>
               <CButton
                  size='md'
                  loading={updateServiceAreaMutation.isPending}
                  type='submit'>
                  Update
               </CButton>
            </div>
         </form>
      </Form>
   );
}
