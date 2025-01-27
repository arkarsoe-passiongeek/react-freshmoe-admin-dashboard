import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { MAIN_SERVICE } from '@/services/apis';
import { Content } from '@/types';

export const getContent = ({
   contentId,
   page,
   section,
}: {
   contentId: string;
   page: string;
   section: string;
}): Promise<{ data: Content }> => {
   return MAIN_SERVICE.get(`/contents/${contentId}`, {
      params: { page, section },
   });
};

export const getContentQueryOptions = (contentId: string, page:string, section: string) => {
   return queryOptions({
      queryKey: ['contents', contentId],
      queryFn: () => getContent({ contentId, page, section }),
   });
};

type UseContentOptions = {
   contentId: string;
   queryConfig?: QueryConfig<typeof getContentQueryOptions>;
};

export const useContent = ({ contentId, queryConfig }: UseContentOptions) => {
   return useQuery({
      ...getContentQueryOptions(contentId),
      ...queryConfig,
   });
};
