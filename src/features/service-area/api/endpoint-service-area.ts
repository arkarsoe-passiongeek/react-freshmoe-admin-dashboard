import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, ServiceArea } from '@/types';
import { getServiceAreasQueryOptions } from './get-service-areas';

export type EndPointServiceArea = {
  status: boolean
}

export const endPointServiceArea = ({
  data,
  serviceAreaId,
}: {
  data: EndPointServiceArea;
  serviceAreaId: string;
}): Promise<ApiResponse<ServiceArea>> => {
  return api.post(
    `/service-areas/${serviceAreaId}/make-endpoint`,
    data,
  );
};

type UseEndpointServiceAreaOptions = {
  parentId: string;
  mutationConfig?: MutationConfig<typeof endPointServiceArea>;
};

export const useEndPointServiceArea = (
  { parentId, mutationConfig }: UseEndpointServiceAreaOptions = {
    parentId: 'null',
  },
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getServiceAreasQueryOptions({ parentId }).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: endPointServiceArea,
  });
};
