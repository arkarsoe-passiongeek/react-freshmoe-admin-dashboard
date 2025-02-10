import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ApiResponse, Layer } from '@/types';

export const getLayer = ({
   layerId,
}: {
   layerId: string;
}): Promise<ApiResponse<Layer>> => {
   return api.get(`/service-layers/${layerId}`);
};

export const getLayerQueryOptions = (layerId: string) => {
   return queryOptions({
      queryKey: ['service-layers', layerId],
      queryFn: () => getLayer({ layerId }),
   });
};

type UseLayerOptions = {
   layerId: string;
   queryConfig?: QueryConfig<typeof getLayerQueryOptions>;
};

export const useLayer = ({ layerId, queryConfig }: UseLayerOptions) => {
   return useQuery({
      ...getLayerQueryOptions(layerId),
      ...queryConfig,
   });
};
