import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { MAIN_SERVICE } from '@/services/apis';
import { Content } from '@/types';
import { getContentsQueryOptions } from '.';

export const createContentInputSchema = z.object({
   title: z.string().min(1, 'Title is required'),
   description: z.string().min(1, 'Description is required'),
   image: z.instanceof(File).refine(file => file.size > 0, 'Image is required'),
   check: z.boolean().refine(val => val === true, {
      message: 'check must be true.',
   }),
});

export type CreateContentInput = z.infer<typeof createContentInputSchema>;

export const createContent = ({
   data,
}: {
   data: CreateContentInput;
}): Promise<Content> => {
   return MAIN_SERVICE.post(`/contents`, data);
};

type UseCreateContentOptions = {
   mutationConfig?: MutationConfig<typeof createContent>;
};

export const useCreateContent = ({
   mutationConfig,
}: UseCreateContentOptions = {}) => {
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
      mutationFn: createContent,
   });
};
