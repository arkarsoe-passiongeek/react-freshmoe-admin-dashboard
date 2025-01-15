import { MAIN_SERVICE } from "@/services/apis";
import * as service from "@/services/apis/endpoints";
import { CreatePriority, Priority, UpdatePriority } from "@/types";

// Create
export async function createPriority(payload: CreatePriority) {
  return (await MAIN_SERVICE.post(service.CREATE_PRIORITY, payload))?.data;
}

// Read
export async function fetchPriorityList(): Promise<Priority[]> {
  return (await MAIN_SERVICE.get(service.GET_PRIORITY_LIST))?.data.data;
}

export async function fetchPriorityDetail(id: number) {
  return (await MAIN_SERVICE.get(`${service.GET_PRIORITY_LIST}/${id}`))?.data
    .data;
}

// Update
export async function updatePriority(payload: UpdatePriority, id: number) {
  return (await MAIN_SERVICE.post(`${service.UPDATE_PRIORITY}/${id}`, payload))
    ?.data;
}

// Delete
export async function deletePriority(id: number | null) {
  return (await MAIN_SERVICE.delete(`${service.DELETE_PRIORITY}/${id}`))?.data
    .data;
}
