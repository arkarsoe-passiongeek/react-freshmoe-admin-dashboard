import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ApiResponse, ServiceType } from '@/types';

export const getServiceType = ({
   serviceTypeId,
}: {
   serviceTypeId: string;
}): Promise<ApiResponse<ServiceType>> => {
   return api.get(`/service-type/${serviceTypeId}`);
};

export const getServiceTypeQueryOptions = (serviceTypeId: string) => {
   return queryOptions({
      queryKey: ['service-type', serviceTypeId],
      queryFn: () => getServiceType({ serviceTypeId }),
   });
};

type UseServiceTypeOptions = {
   serviceTypeId: string;
   queryConfig?: QueryConfig<typeof getServiceTypeQueryOptions>;
};

export const useServiceType = ({ serviceTypeId, queryConfig }: UseServiceTypeOptions) => {
   return useQuery({
      ...getServiceTypeQueryOptions(serviceTypeId),
      ...queryConfig,
   });
};
