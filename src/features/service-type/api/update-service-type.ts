import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, ServiceType } from '@/types';

import { getServiceTypeQueryOptions } from './get-service-type';
import { getServiceTypesQueryOptions } from './get-service-types';

export const updateServiceTypeInputSchema = z.object({
   name: z.string().min(1, {
      message: 'name must be at least 2 characters.',
   }),
   consent: z.boolean().refine(val => val === true, {
      message: 'Check must be true.',
   }),
});

export type UpdateServiceTypeInput = z.infer<
   typeof updateServiceTypeInputSchema
>;

export const updateServiceType = ({
   data,
   serviceTypeId,
}: {
   data: UpdateServiceTypeInput;
   serviceTypeId: string;
}): Promise<ApiResponse<ServiceType>> => {
   const payload = { name: data.name };
   return api.post(`/service-type/${serviceTypeId}`, payload);
};

type UseUpdateServiceTypeOptions = {
   mutationConfig?: MutationConfig<typeof updateServiceType>;
};

export const useUpdateServiceType = ({
   mutationConfig,
}: UseUpdateServiceTypeOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (data, ...args) => {
         queryClient.refetchQueries({
            queryKey: getServiceTypeQueryOptions(String(data.data.id)).queryKey,
         });
         queryClient.refetchQueries({
            queryKey: getServiceTypesQueryOptions().queryKey,
         });
         onSuccess?.(data, ...args);
      },
      ...restConfig,
      mutationFn: updateServiceType,
   });
};
