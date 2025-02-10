import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Layer, ListApiResponse } from '@/types';

export const getLayers = (page = 1): Promise<ListApiResponse<Layer>> => {
   return api.get(`/service-layers`, {
      params: {
         page,
      },
   });
};

export const getLayersQueryOptions = ({ page }: { page?: number } = {}) => {
   return queryOptions({
      queryKey: page ? ['service-layers', { page }] : ['service-layers'],
      queryFn: () => getLayers(page),
   });
};

type UseLayersOptions = {
   page?: number;
   queryConfig?: QueryConfig<typeof getLayersQueryOptions>;
};

export const useLayers = ({ queryConfig, page }: UseLayersOptions) => {
   return useQuery({
      ...getLayersQueryOptions({ page }),
      ...queryConfig,
   });
};
