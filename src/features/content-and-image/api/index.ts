import { QueryConfig } from '@/lib/react-query';
import { MAIN_SERVICE } from '@/services/apis';
import { Content } from '@/types/models/content';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getContents = async (
   page = 'home',
   section = '1'
): Promise<{
   data: Content[];
}> => {
   return (await MAIN_SERVICE.get(`/contents?page=${page}&section=${section}`))
      .data;
};

export const getContentsQueryOptions = ({
   page,
   section,
}: { page?: string; section?: string } = {}) => {
   console.log(page, section, 'testing');
   return queryOptions({
      queryKey: page ? ['contents', page, section] : ['contents'],
      queryFn: () => getContents(page, section),
   });
};

type UseContentsOptions = {
   page?: string;
   section?: string;
   queryConfig?: QueryConfig<typeof getContentsQueryOptions>;
};

export const useContents = ({
   queryConfig,
   page,
   section,
}: UseContentsOptions) => {
   return useQuery({
      ...getContentsQueryOptions({ page, section }),
      ...queryConfig,
   });
};
