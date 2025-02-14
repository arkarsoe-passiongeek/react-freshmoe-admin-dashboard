import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { ApiResponse, ServiceType } from '@/types';
import { getServiceTypesQueryOptions } from './get-service-types';

export const deleteServiceType = ({
   serviceTypeId,
}: {
   serviceTypeId: string;
}): Promise<ApiResponse<ServiceType>> => {
   return api.delete(`/service-type/${serviceTypeId}`);
};

type UseDeleteServiceTypeOptions = {
   mutationConfig?: MutationConfig<typeof deleteServiceType>;
};

export const useDeleteServiceType = ({
   mutationConfig,
}: UseDeleteServiceTypeOptions = {}) => {
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
      mutationFn: deleteServiceType,
   });
};
