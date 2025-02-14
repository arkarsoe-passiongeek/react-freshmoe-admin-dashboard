import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, ServiceType } from '@/types';

import { api } from '@/lib/api-client';
import { getServiceTypesQueryOptions } from './get-service-types';

export const createServiceTypeInputSchema = z.object({
   name: z.string().min(1, {
      message: 'name must be at least 2 characters.',
   }),
   code: z.string().min(1, {
      message: 'code must be at least 2 characters.',
   }),
});

export type CreateServiceTypeInput = z.infer<
   typeof createServiceTypeInputSchema
>;

export const createServiceType = ({
   data,
}: {
   data: CreateServiceTypeInput;
}): Promise<ApiResponse<ServiceType>> => {
   return api.post(`/service-type`, data);
};

type UseCreateServiceTypeOptions = {
   mutationConfig?: MutationConfig<typeof createServiceType>;
};

export const useCreateServiceType = ({
   mutationConfig,
}: UseCreateServiceTypeOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (...args) => {
         queryClient.invalidateQueries({
            queryKey: getServiceTypesQueryOptions().queryKey,
         });
         onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: createServiceType,
   });
};
