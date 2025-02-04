import { MAIN_SERVICE } from '@/services/apis';
import * as service from '@/services/apis/endpoints';
import {
   CreateLayer,
   DeleteLayer,
   Layer,
   ReorderLayer,
   UpdateLayer,
} from '@/types';

// Create
export async function createLayer(payload: CreateLayer) {
   return (await MAIN_SERVICE.post(service.CREATE_LAYER, payload))?.data;
}

// Read
export async function fetchLayerList(): Promise<Layer[]> {
   return (await MAIN_SERVICE.get(service.GET_LAYER_LIST))?.data.data;
}

export async function fetchLayerDetail(id: number) {
   return (await MAIN_SERVICE.get(service.GET_LAYER_LIST + '/' + id))?.data
      .data;
}

// Update
export async function updateLayer(payload: UpdateLayer, id: number) {
   return (await MAIN_SERVICE.post(service.UPDATE_LAYER + '/' + id, payload))
      ?.data;
}

// Reorder
export async function reorderLayer(payload: ReorderLayer, id: number) {
   return (
      await MAIN_SERVICE.post(service.REORDER_LAYER + '/reorder/' + id, payload)
   )?.data;
}

// Delete
export async function deleteLayer(payload: DeleteLayer) {
   return (await MAIN_SERVICE.delete(service.DELETE_LAYER + '/' + payload.id))
      ?.data.data;
}
