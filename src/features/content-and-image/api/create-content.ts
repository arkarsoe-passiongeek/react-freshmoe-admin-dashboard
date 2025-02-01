import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { generateFormdata } from '@/lib/utils';
import { MAIN_SERVICE } from '@/services/apis';
import { ApiResponse, Content } from '@/types';
import { AxiosResponse } from 'axios';
import { getContentsQueryOptions } from '.';
import {
   isDescriptionExist,
   isImage2Exist,
   isImageExist,
   isTitleExist,
} from '../utils';

export const createContentInputSchema = z.object({
   title: z.string().optional(),
   description: z.string().optional(),
   image: z.any().optional(),
   image2: z.any().optional(),
   check: z.boolean().refine(val => val === true, {
      message: 'check must be true.',
   }),
});

export type CreateContentInput = z.infer<typeof createContentInputSchema>;

export const createContent = ({
   data,
}: {
   data: CreateContentInput;
}): Promise<AxiosResponse<ApiResponse<Content>>> => {
   if (!isTitleExist(data.page, data.section)) {
      delete data.title;
   }
   if (!isDescriptionExist(data.page, data.section)) {
      delete data.description;
   }
   if (!isImageExist(data.page, data.section)) {
      delete data.image;
   }
   if (!isImage2Exist(data.page, data.section)) {
      delete data.image2;
   }
   console.log(data);
   const contentForm = generateFormdata(data);
   if (data.page === 'about_us' && data.section === '2') {
      console.log(contentForm.get('image'));
      contentForm.append('images', data.image);
      contentForm.append('images', data.image2);
      contentForm.delete('image');
      contentForm.delete('image2');
   }
   console.log('here', data);
   console.log(contentForm);
   return MAIN_SERVICE.post(
      `/contents?page=${data.page}&section=${data.section}`,
      contentForm,
      {
         headers: { Accept: 'application/form-data' },
      }
   );
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
         console.log(args[0].data.data);
         queryClient.invalidateQueries({
            queryKey: getContentsQueryOptions().queryKey,
         });
         onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: createContent,
   });
};
