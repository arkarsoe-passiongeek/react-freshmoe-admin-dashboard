import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, Layer } from '@/types';

import { UpdateLayer } from '@/types/dtos/layer/update-layer.dto';
import { plainToClass } from 'class-transformer';
import { getLayerQueryOptions } from './get-layer';
import { getLayersQueryOptions } from './get-layers';

export const updateLayerInputSchema = z.object({
   name: z.string().min(1, {
      message: 'name must be at least 2 characters.',
   }),
   consent: z.boolean().refine(val => val === true, {
      message: 'Check must be true.',
   }),
});

export type UpdateLayerInput = z.infer<typeof updateLayerInputSchema>;

export const updateLayer = ({
   data,
   layerId,
}: {
   data: UpdateLayerInput;
   layerId: string;
}): Promise<ApiResponse<Layer>> => {
   return api.post(
      `/service-layers/${layerId}`,
      plainToClass(UpdateLayer, data),
   );
};

type UseUpdateLayerOptions = {
   mutationConfig?: MutationConfig<typeof updateLayer>;
};

export const useUpdateLayer = ({
   mutationConfig,
}: UseUpdateLayerOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (data, ...args) => {
         queryClient.refetchQueries({
            queryKey: getLayerQueryOptions(String(data.data.id)).queryKey,
         });
         queryClient.refetchQueries({
            queryKey: getLayersQueryOptions().queryKey,
         });
         onSuccess?.(data, ...args);
      },
      ...restConfig,
      mutationFn: updateLayer,
   });
};
