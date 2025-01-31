import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { generateFormdata } from '@/lib/utils';
import { MAIN_SERVICE } from '@/services/apis';
import { Content } from '@/types';
import { getContentsQueryOptions } from '.';
import { isImage2Exist } from '../utils';

export const updateContentInputSchema = z.object({
   title: z.string().min(1, 'Title is required'),
   description: z.string().min(1, 'Description is required'),
   imgUrl: z.any(),
   image: z.any().optional(),
   image2: z.any().optional(),
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
   const formData = generateFormdata(data);

   if (!isImage2Exist(data.page, data.section)) {
      let imgUpdate = 'original';
      if (data.image === null) {
         imgUpdate = 'delete';
      } else if (data.image) {
         imgUpdate = 'update';
      }
      // formData.append('imgUpdate', imgUpdate);
      data.imgUpdate = imgUpdate;
   }

   if (isImage2Exist(data.page, data.section)) {
      let oldImages = [];
      data.imgUrl.split(',').forEach((img, index) => {
         if (data.image !== null && index === 0) {
            oldImages.push(img)
         }
         if (data.image2 !== null && index === 1) {
            oldImages.push(img)
         }
      });

      oldImages = oldImages.join(',');

      // formData.append('oldImages', oldImages);
      data.oldImages = oldImages;
   }



   console.log({ ...data }, 'this is update data');
   // return MAIN_SERVICE.post(
   //    `/contents/${id}?page=${data.page}&section=${data.section}`,
   //    generateFormdata({
   //       ...data,
   //       imgUpdate: imgUpdate,
   //    })
   // );
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
         console.log(data, 'this is data');
         queryClient.refetchQueries({
            queryKey: getContentsQueryOptions(data.id).queryKey,
         });
         onSuccess?.(data, ...args);
      },
      ...restConfig,
      mutationFn: updateContent,
   });
};
