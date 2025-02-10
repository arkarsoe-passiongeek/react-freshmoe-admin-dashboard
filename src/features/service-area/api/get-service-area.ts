import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ApiResponse, ServiceArea } from '@/types';

export const getServiceArea = ({
   serviceAreaId,
}: {
   serviceAreaId: string;
}): Promise<ApiResponse<ServiceArea>> => {
   return api.get(`/service-areas/${serviceAreaId}`);
};

export const getServiceAreaQueryOptions = (serviceAreaId: string) => {
   return queryOptions({
      queryKey: ['service-areas', serviceAreaId],
      queryFn: () => getServiceArea({ serviceAreaId }),
   });
};

type UseServiceAreaOptions = {
   serviceAreaId: string;
   queryConfig?: QueryConfig<typeof getServiceAreaQueryOptions>;
};

export const useServiceArea = ({
   serviceAreaId,
   queryConfig,
}: UseServiceAreaOptions) => {
   return useQuery({
      ...getServiceAreaQueryOptions(serviceAreaId),
      ...queryConfig,
   });
};
