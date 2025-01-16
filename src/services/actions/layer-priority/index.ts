import { MAIN_SERVICE } from "@/services/apis";
import * as service from "@/services/apis/endpoints";
import {
  CreateLayerPriority,
  LayerPriority,
  UpdateLayerPriority,
} from "@/types";

// Create
export async function createLayerPriority(payload: CreateLayerPriority) {
  return (await MAIN_SERVICE.post(service.CREATE_LAYER_PRIORITY, payload))
    ?.data;
}

// Read
export async function fetchLayerPriorityList(payload?: {
  query: { parentId: string };
}): Promise<LayerPriority[]> {
  let query = {};
  if (payload?.query?.parentId) {
    query = payload.query;
  }
  return (
    await MAIN_SERVICE.get(service.GET_LAYER_PRIORITY_LIST, { params: query })
  )?.data.data;
}

export async function fetchLayerPriorityDetail(id: number) {
  return (await MAIN_SERVICE.get(`${service.GET_LAYER_PRIORITY_LIST}/${id}`))
    ?.data.data;
}

// Update
export async function updateLayerPriority(
  payload: UpdateLayerPriority,
  id: number
) {
  return (
    await MAIN_SERVICE.post(`${service.UPDATE_LAYER_PRIORITY}/${id}`, payload)
  )?.data;
}

// Delete
export async function deleteLayerPriority(id: number | null) {
  return (await MAIN_SERVICE.delete(`${service.DELETE_LAYER_PRIORITY}/${id}`))
    ?.data.data;
}
