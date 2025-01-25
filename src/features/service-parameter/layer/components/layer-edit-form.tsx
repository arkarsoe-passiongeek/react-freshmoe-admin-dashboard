import CButton from '@/components/custom/c-button';
import CFormLabel from '@/components/custom/c-form-label';
import CInput from '@/components/custom/c-input';
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
import { queryClient } from '@/main';
import { updateLayer } from '@/services/actions/layer';
import { Layer } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const formSchema = z.object({
   name: z.string().min(2, {
      message: 'name must be at least 2 characters.',
   }),
   check: z.boolean().refine(val => val === true, {
      message: 'check must be true.',
   }),
});

export function LayerEditForm({
   defaultValues,
}: Readonly<{ defaultValues: Layer }>) {
   const routes = useLinkRoutes();
   const navigate = useNavigate();
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues,
   });

   const updateMutation = useMutation({
      mutationFn: (values: z.infer<typeof formSchema>) =>
         updateLayer(values, defaultValues.id),
      onError: error => {
         form.setError('name', { type: 'manual', message: error.message });
      },
      onSuccess: () => {
         // Boom baby!
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.layer.view(Number(defaultValues.id))],
         });
         queryClient.invalidateQueries({
            queryKey: [API_ROUTES.layer.getAll()],
         });
         navigate(routes.layer());
      },
   });

   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
      updateMutation.mutate(values);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <h3 className='text-xl font-semibold'>Service Layer Information</h3>
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
                  styleType='update'
                  type='submit'
                  className={`${
                     form.formState.isDirty && form.formState.isValid === false
                        ? 'bg-c-contrast hover:bg-c-contrast'
                        : ''
                  }`}>
                  Update
               </CButton>
            </div>
         </form>
      </Form>
   );
}
