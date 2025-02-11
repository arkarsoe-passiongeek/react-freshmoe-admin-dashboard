import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, ServiceArea } from '@/types';

import { getServiceAreaQueryOptions } from './get-service-area';
import { getServiceAreasQueryOptions } from './get-service-areas';

export type CheckServiceAreaServiceInput = {
   status: boolean;
   statusType: string;
   serviceType: string;
};

export const checkServiceAreaService = ({
   data,
   serviceAreaId,
}: {
   data: CheckServiceAreaServiceInput;
   serviceAreaId: string;
}): Promise<ApiResponse<ServiceArea>> => {
   return api.post(`/service-areas/${serviceAreaId}/status/change`, data);
};

type UseCheckServiceAreaServiceOptions = {
   parentId: string;
   mutationConfig?: MutationConfig<typeof checkServiceAreaService>;
};

export const useCheckServiceAreaService = (
   { parentId, mutationConfig }: UseCheckServiceAreaServiceOptions = {
      parentId: 'null',
   },
) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (data, ...args) => {
         queryClient.refetchQueries({
            queryKey: getServiceAreaQueryOptions(String(data.data.id)).queryKey,
         });
         queryClient.refetchQueries({
            queryKey: getServiceAreasQueryOptions({ parentId }).queryKey,
         });
         onSuccess?.(data, ...args);
      },
      ...restConfig,
      mutationFn: checkServiceAreaService,
   });
};
