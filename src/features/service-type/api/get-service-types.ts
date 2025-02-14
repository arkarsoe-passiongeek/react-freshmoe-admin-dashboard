import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ServiceType, ListApiResponse } from '@/types';

export const getServiceTypes = (page = 1): Promise<ListApiResponse<ServiceType>> => {
   return api.get(`/service-type`, {
      params: {
         page,
      },
   });
};

export const getServiceTypesQueryOptions = ({ page }: { page?: number } = {}) => {
   return queryOptions({
      queryKey: page ? ['service-type', { page }] : ['service-type'],
      queryFn: () => getServiceTypes(page),
   });
};

type UseServiceTypesOptions = {
   page?: number;
   queryConfig?: QueryConfig<typeof getServiceTypesQueryOptions>;
};

export const useServiceTypes = ({ queryConfig, page }: UseServiceTypesOptions) => {
   return useQuery({
      ...getServiceTypesQueryOptions({ page }),
      ...queryConfig,
   });
};
