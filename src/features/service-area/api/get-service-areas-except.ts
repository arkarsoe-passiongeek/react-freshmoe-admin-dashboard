import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ListApiResponse, ServiceArea } from '@/types';

export const getServiceAreasExcept = (
  page = 1,
  serviceAreaId: string,
): Promise<ListApiResponse<ServiceArea>> => {
  return api.get(`/service-areas/except/${serviceAreaId}`, {
    params: {
      page,
    },
  });
};

export const getServiceAreasExceptQueryOptions = (
  { page, serviceAreaId }: { page?: number; serviceAreaId: string } = {
    serviceAreaId: 'null',
  },
) => {
  return queryOptions({
    queryKey: page
      ? ['service-areas', { page, serviceAreaId }]
      : ['service-areas', { serviceAreaId }],
    queryFn: () => getServiceAreasExcept(page, serviceAreaId),
  });
};

type UseServiceAreasOptions = {
  page?: number;
  serviceAreaId: string;
  queryConfig?: QueryConfig<typeof getServiceAreasExceptQueryOptions>;
};

export const useServiceAreasExcept = ({
  queryConfig,
  page,
  serviceAreaId,
}: UseServiceAreasOptions) => {
  return useQuery({
    ...getServiceAreasExceptQueryOptions({ page, serviceAreaId }),
    ...queryConfig,
  });
};
