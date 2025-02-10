import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { RootUser } from '@/types';

export const requirements = [
   { regex: /.{8,}/, text: 'At least 8 characters' },
   { regex: /[0-9]/, text: 'At least 1 number' },
   { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
   { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
   { regex: /[!@#%^&*]/, text: 'At least 1 special character (@!#%^&*)' },
];

export const changePasswordInputSchema = z
   .object({
      password: z.string().min(2, {
         message: 'Password must be at least 2 characters.',
      }),
      new_password: z
         .string()
         .min(8, {
            message: 'New Password must be at least 8 characters.',
         })
         // Dynamically applying each regex check from the requirements
         .refine(value => {
            return requirements.every(({ regex }) => regex.test(value));
         }),
      confirm_password: z.string().min(2, {
         message: 'Confirm Password must be at least 2 characters.',
      }),
      consent: z.boolean().refine(value => value === true, {
         message: 'You must agree to the terms.',
      }),
   })
   .refine(data => data.new_password === data.confirm_password, {
      path: ['confirm_password'], // Highlight the confirm_password field on error
      message: 'New Password and Confirm Password must match.',
   });

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export const changePassword = ({
   data,
}: {
   data: ChangePasswordInput;
}): Promise<RootUser> => {
   return api.put(`/change-password}`, data);
};

type UseChangePasswordOptions = {
   mutationConfig?: MutationConfig<typeof changePassword>;
};

export const useChangePassword = ({
   mutationConfig,
}: UseChangePasswordOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (data, ...args) => {
         queryClient.refetchQueries({
            queryKey: ['change-password'],
         });
         onSuccess?.(data, ...args);
      },
      ...restConfig,
      mutationFn: changePassword,
   });
};
