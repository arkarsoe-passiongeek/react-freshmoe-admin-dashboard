import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import useAuth from '@/state/use-auth-store';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const loginInputSchema = z.object({
   email: z.string().min(2, {
      message: 'Email must be at least 2 characters.',
   }),
   password: z.string().min(2, {
      message: 'Password must be at least 2 characters.',
   }),
   remember_me: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const login = (loginData: LoginInput) => {
   return api.post('/login', loginData);
};

type UseLoginMutationOptions = {
   onSuccess?: () => void;
   mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = (mutationConfig: UseLoginMutationOptions = {}) => {
   const { setUser, setToken } = useAuth();
   const { onSuccess, ...config } = mutationConfig ?? {};
   return useMutation({
      onSuccess: (...args) => {
         onSuccess?.();
         setUser(args[0].data);
         setToken(args[0].data.token);
      },
      ...config,
      mutationFn: login,
   });
};
