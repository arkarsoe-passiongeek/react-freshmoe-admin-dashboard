import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, Layer, ReorderLayer } from '@/types';

import { getLayerQueryOptions } from './get-layer';
import { getLayersQueryOptions } from './get-layers';

export const reorderLayer = ({
  data,
  layerId,
}: {
  data: ReorderLayer;
  layerId: string;
}): Promise<ApiResponse<Layer>> => {
  return api.post(
    `/service-layers/reorder/${layerId}`,
    data,
  );
};

type UseReorderLayerOptions = {
  mutationConfig?: MutationConfig<typeof reorderLayer>;
};

export const useReorderLayer = ({
  mutationConfig,
}: UseReorderLayerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getLayerQueryOptions(String(args[0].layerId)).queryKey,
      });
      queryClient.refetchQueries({
        queryKey: getLayersQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: reorderLayer,
  });
};
