import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse, ServiceArea } from '@/types';

import { UpdateServiceArea } from '@/types/dtos/service-area/update-service-area.dto';
import { plainToClass } from 'class-transformer';
import { getServiceAreaQueryOptions } from './get-service-area';
import { getServiceAreasQueryOptions } from './get-service-areas';

export const updateServiceAreaInputSchema = z.object({
   name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
   }),
   serviceLayerId: z.string().min(1, {
      message: 'Layer must be at least 1 characters.',
   }),
   parentId: z.string().min(1, {
      message: 'Parent Service Area Id must be at least 1 characters.',
   }),
   consent: z.boolean().refine(val => val === true, {
      message: 'Check must be true.',
   }),
});

export type UpdateServiceAreaInput = z.infer<
   typeof updateServiceAreaInputSchema
>;

export const updateServiceArea = ({
   data,
   serviceAreaId,
}: {
   data: UpdateServiceAreaInput;
   serviceAreaId: string;
}): Promise<ApiResponse<ServiceArea>> => {
   return api.post(
      `/service-areas/${serviceAreaId}`,
      plainToClass(UpdateServiceArea, data),
   );
};

type UseUpdateServiceAreaOptions = {
   parentId: string;
   mutationConfig?: MutationConfig<typeof updateServiceArea>;
};

export const useUpdateServiceArea = (
   { parentId, mutationConfig }: UseUpdateServiceAreaOptions = {
      parentId: 'null',
   },
) => {
   const queryClient = useQueryClient();

   const { onSuccess, ...restConfig } = mutationConfig || {};

   return useMutation({
      onSuccess: (data, ...args) => {
         queryClient.refetchQueries({
            queryKey: getServiceAreaQueryOptions(String(data.data.id)).queryKey,
         });
         queryClient.refetchQueries({
            queryKey: getServiceAreasQueryOptions({ parentId }).queryKey,
         });
         onSuccess?.(data, ...args);
      },
      ...restConfig,
      mutationFn: updateServiceArea,
   });
};
