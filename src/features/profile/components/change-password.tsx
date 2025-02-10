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
import { paths } from '@/config/paths';
import { useIcons } from '@/hooks/use-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import {
   changePasswordInputSchema,
   requirements,
   useChangePassword,
} from '../api/change-password';

export function ChangePasswordForm() {
   const navigate = useNavigate();
   const { getEyeCloseIcon, getEyeOpenIcon } = useIcons();

   // 1. Define your form.
   const form = useForm<z.infer<typeof changePasswordInputSchema>>({
      resolver: zodResolver(changePasswordInputSchema),
      defaultValues: {
         password: '',
         new_password: '',
         confirm_password: '',
      },
   });
   const [passwordHide, setPasswordHide] = useState(true);

   const changePasswordMutation = useChangePassword({
      mutationConfig: {
         onError: error => {
            form.setError('password', {
               type: 'manual',
               message: error.message,
            });
         },
         onSuccess: () => {
            // Boom baby!
            form.reset();
            navigate(paths.profile.path);
         },
      },
   });

   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof changePasswordInputSchema>) {
      changePasswordMutation.mutate({ data: values });
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <h3 className='text-xl font-semibold'>
               Change Password Information
            </h3>
            <FormField
               control={form.control}
               name='password'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>Password</CFormLabel>
                     <FormControl>
                        <CInput.WithEndButton
                           type={`${passwordHide ? 'password' : 'text'}`}
                           getIcon={
                              passwordHide ? getEyeCloseIcon : getEyeOpenIcon
                           }
                           onButtonClick={() => setPasswordHide(!passwordHide)}
                           placeholder='Enter your password'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='new_password'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>
                        New Password
                     </CFormLabel>
                     <FormControl>
                        <CInput.WithPasswordStrengthIndicator
                           requirements={requirements}
                           autoComplete='new-password'
                           type={`${passwordHide ? 'password' : 'text'}`}
                           getIcon={
                              passwordHide ? getEyeCloseIcon : getEyeOpenIcon
                           }
                           onButtonClick={() => setPasswordHide(!passwordHide)}
                           placeholder='Enter your password'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='confirm_password'
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className='!text-black'>
                        Confirm Password
                     </CFormLabel>
                     <FormControl>
                        <CInput.WithEndButton
                           type={`${passwordHide ? 'password' : 'text'}`}
                           getIcon={
                              passwordHide ? getEyeCloseIcon : getEyeOpenIcon
                           }
                           onButtonClick={() => setPasswordHide(!passwordHide)}
                           placeholder='Enter your password'
                           {...field}
                        />
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
                  loading={changePasswordMutation.isPending}
                  variant='default'
                  type='submit'>
                  Update
               </CButton>
            </div>
         </form>
      </Form>
   );
}
