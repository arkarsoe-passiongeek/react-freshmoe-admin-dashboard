import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, ServiceArea } from '@/types';

import { api } from '@/lib/api-client';
import { CreateServiceArea } from '@/types/dtos/service-area/create-service-area.dto';
import { plainToClass } from 'class-transformer';
import { getServiceAreasQueryOptions } from './get-service-areas';

export const createServiceAreaInputSchema = z.object({
   name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
   }),
   serviceLayerId: z.string().min(1, {
      message: 'Layer must be at least 1 characters.',
   }),
   parentId: z.string().min(1, {
      message: 'Parent Service Area Id must be at least 1 characters.',
   }),
});

export type CreateServiceAreaInput = z.infer<
   typeof createServiceAreaInputSchema
>;

export const createServiceArea = ({
   data,
}: {
   data: CreateServiceAreaInput;
}): Promise<ApiResponse<ServiceArea>> => {
   return api.post(`/service-areas`, plainToClass(CreateServiceArea, data));
};

type UseCreateServiceAreaOptions = {
   parentId: string;
   mutationConfig?: MutationConfig<typeof createServiceArea>;
};

export const useCreateServiceArea = (
   { parentId, mutationConfig }: UseCreateServiceAreaOptions = {
      parentId: 'null',
   },
) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (...args) => {
         queryClient.invalidateQueries({
            queryKey: getServiceAreasQueryOptions({ parentId }).queryKey,
         });
         onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: createServiceArea,
   });
};
