import { MutationConfig } from '@/lib/react-query';
import { MAIN_SERVICE } from '@/services/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getContentsQueryOptions } from '.';

export const deleteContent = ({
   id,
   page,
   section,
}: {
   id: number;
   page: string;
   section: string;
}) => {
   return MAIN_SERVICE.delete(
      `/contents/${id}?page=${page}&section=${section}`
   );
};

type UseDeleteContentOptions = {
   mutationConfig?: MutationConfig<typeof deleteContent>;
};

export const useDeleteContent = ({
   mutationConfig,
}: UseDeleteContentOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (...args) => {
         queryClient.invalidateQueries({
            queryKey: getContentsQueryOptions().queryKey,
         });
         onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: deleteContent,
   });
};
