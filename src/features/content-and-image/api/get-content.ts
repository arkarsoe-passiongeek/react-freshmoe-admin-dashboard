import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { MAIN_SERVICE } from '@/services/apis';
import { Content } from '@/types';

export const getContent = async ({
   contentId,
   page,
   section,
}: {
   contentId: string;
   page: string;
   section: string;
}): Promise<{ data: Content }> => {
   console.log(contentId, page, section);
   return (
      // await Promise.resolve({ data: { data: { id: '1', title: 'title', description: 'testing', imgUrl: 'image-1,iamgew-2' } as Content } })
      (
         await MAIN_SERVICE.get(`/contents/${contentId}`, {
            params: { page, section },
         })
      ).data
   );
};

export const getContentQueryOptions = (
   contentId: string,
   page: string,
   section: string
) => {
   return queryOptions({
      queryKey: ['contents', contentId],
      queryFn: () => getContent({ contentId, page, section }),
   });
};

type UseContentOptions = {
   contentId: string;
   page: string;
   section: string;
   queryConfig?: QueryConfig<typeof getContentQueryOptions>;
};

export const useContent = ({
   contentId,
   page,
   section,
   queryConfig,
}: UseContentOptions) => {
   return useQuery({
      ...getContentQueryOptions(contentId, page, section),
      ...queryConfig,
   });
};
