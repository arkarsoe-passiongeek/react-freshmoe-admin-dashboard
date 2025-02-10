import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ListApiResponse, ServiceArea } from '@/types';

export const getServiceAreas = (
   page = 1,
   parentId: string,
): Promise<ListApiResponse<ServiceArea>> => {
   return api.get(`/service-areas?parentId=${parentId}`, {
      params: {
         page,
      },
   });
};

export const getServiceAreasQueryOptions = (
   { page, parentId }: { page?: number; parentId: string } = {
      parentId: 'null',
   },
) => {
   return queryOptions({
      queryKey: page
         ? ['service-areas', { page, parentId }]
         : ['service-areas', { parentId }],
      queryFn: () => getServiceAreas(page, parentId),
   });
};

type UseServiceAreasOptions = {
   page?: number;
   parentId: string;
   queryConfig?: QueryConfig<typeof getServiceAreasQueryOptions>;
};

export const useServiceAreas = ({
   queryConfig,
   page,
   parentId,
}: UseServiceAreasOptions) => {
   return useQuery({
      ...getServiceAreasQueryOptions({ page, parentId }),
      ...queryConfig,
   });
};
