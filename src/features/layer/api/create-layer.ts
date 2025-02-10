import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, Layer } from '@/types';

import { api } from '@/lib/api-client';
import { CreateLayer } from '@/types/dtos/layer/create-layer.dto';
import { plainToClass } from 'class-transformer';
import { getLayersQueryOptions } from './get-layers';

export const createLayerInputSchema = z.object({
   name: z.string().min(1, {
      message: 'name must be at least 2 characters.',
   }),
});

export type CreateLayerInput = z.infer<typeof createLayerInputSchema>;

export const createLayer = ({
   data,
}: {
   data: CreateLayerInput;
}): Promise<ApiResponse<Layer>> => {
   return api.post(`/service-layers`, plainToClass(CreateLayer, data));
};

type UseCreateLayerOptions = {
   mutationConfig?: MutationConfig<typeof createLayer>;
};

export const useCreateLayer = ({
   mutationConfig,
}: UseCreateLayerOptions = {}) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (...args) => {
         queryClient.invalidateQueries({
            queryKey: getLayersQueryOptions().queryKey,
         });
         onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: createLayer,
   });
};
