import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { generateFormdata } from '@/lib/utils';
import { MAIN_SERVICE } from '@/services/apis';
import { Content } from '@/types';
import { getContentsQueryOptions } from '.';

export const updateContentInputSchema = z.object({
   title: z.string().min(1, 'Title is required'),
   description: z.string().min(1, 'Description is required'),
   imgUrl: z.any(),
   image: z.any().optional(),
   check: z.boolean().refine(val => val === true, {
      message: 'check must be true.',
   }),
});

export type UpdateContentInput = z.infer<typeof updateContentInputSchema>;

export const updateContent = ({
   data,
   id,
}: {
   data: UpdateContentInput;
   id: string;
}): Promise<Content> => {
   // data.image = null;
   return MAIN_SERVICE.post(
      `/contents/${id}?page=${data.page}&section=${data.section}`,
      generateFormdata(data)
   );
};

type UseUpdateContentOptions = {
   mutationConfig?: MutationConfig<typeof updateContent>;
};

export const useUpdateContent = ({
   mutationConfig,
}: UseUpdateContentOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (data, ...args) => {
         queryClient.refetchQueries({
            queryKey: getContentsQueryOptions(data.id).queryKey,
         });
         onSuccess?.(data, ...args);
      },
      ...restConfig,
      mutationFn: updateContent,
   });
};
