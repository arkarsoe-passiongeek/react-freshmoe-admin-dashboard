import { MAIN_SERVICE } from '@/services/apis';
import * as service from '@/services/apis/endpoints';
import {
   CreateServiceArea,
   DeleteServiceArea,
   ServiceArea,
   UpdateServiceArea,
} from '@/types';

// Create
export async function createServiceArea(payload: CreateServiceArea) {
   return (await MAIN_SERVICE.post(service.CREATE_SERVICE_AREA, payload))?.data;
}

// Read
export async function fetchAllServiceAreaExcept(id): Promise<ServiceArea[]> {
   return (
      await MAIN_SERVICE.get(service.GET_SERVICE_AREA_LIST + '/except/' + id)
   )?.data.data;
}

// Read
export async function fetchServiceAreaList(payload): Promise<ServiceArea[]> {
   return (
      await MAIN_SERVICE.get(service.GET_SERVICE_AREA_LIST, { params: payload })
   )?.data.data;
}

// Read
export async function fetchServiceAreaBreadcrumbs(
   payload
): Promise<ServiceArea[]> {
   return (
      await MAIN_SERVICE.get(
         service.GET_SERVICE_AREA_LIST + `/${payload.id}/breadcrumbs`
      )
   )?.data.data;
}

export async function fetchServiceAreaDetail(id: number) {
   return (await MAIN_SERVICE.get(service.GET_SERVICE_AREA_LIST + '/' + id))
      ?.data.data;
}

// Update
export async function updateServiceArea(
   payload: UpdateServiceArea,
   id: number
) {
   return (
      await MAIN_SERVICE.post(service.UPDATE_SERVICE_AREA + '/' + id, payload)
   )?.data;
}

// Delete
export async function deleteServiceArea(payload: DeleteServiceArea) {
   return (
      await MAIN_SERVICE.delete(service.DELETE_SERVICE_AREA + '/' + payload.id)
   )?.data.data;
}
