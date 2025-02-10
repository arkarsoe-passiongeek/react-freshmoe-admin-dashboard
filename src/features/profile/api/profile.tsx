import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User } from '@/types';

export const getProfile = (): Promise<{ data: User }> => {
   return api.get(`/profile`);
};

export const getProfileQueryOptions = () => {
   return queryOptions({
      queryKey: ['profiles'],
      queryFn: () => getProfile(),
   });
};

type UseProfileOptions = {
   queryConfig?: QueryConfig<typeof getProfileQueryOptions>;
};

export const useProfile = ({ queryConfig }: UseProfileOptions) => {
   return useQuery({
      ...getProfileQueryOptions(),
      ...queryConfig,
   });
};
