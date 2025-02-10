import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { ApiResponse, Layer } from '@/types';
import { getLayersQueryOptions } from './get-layers';

export const deleteLayer = ({
   layerId,
}: {
   layerId: string;
}): Promise<ApiResponse<Layer>> => {
   return api.delete(`/service-layers/${layerId}`);
};

type UseDeleteLayerOptions = {
   mutationConfig?: MutationConfig<typeof deleteLayer>;
};

export const useDeleteLayer = ({
   mutationConfig,
}: UseDeleteLayerOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (...args) => {
         queryClient.invalidateQueries({
            queryKey: getLayersQueryOptions().queryKey,
         });
         onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: deleteLayer,
   });
};
