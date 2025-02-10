import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { ApiResponse, ServiceArea } from '@/types';
import { getServiceAreasQueryOptions } from './get-service-areas';

export const deleteServiceArea = ({
   serviceAreaId,
}: {
   serviceAreaId: string;
}): Promise<ApiResponse<ServiceArea>> => {
   return api.delete(`/service-areas/${serviceAreaId}`);
};

type UseDeleteServiceAreaOptions = {
   parentId: string;
   mutationConfig?: MutationConfig<typeof deleteServiceArea>;
};

export const useDeleteServiceArea = (
   { parentId, mutationConfig }: UseDeleteServiceAreaOptions = {
      parentId: 'null',
   },
) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (...args) => {
         queryClient.invalidateQueries({
            queryKey: getServiceAreasQueryOptions({ parentId }).queryKey,
         });
         onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: deleteServiceArea,
   });
};
