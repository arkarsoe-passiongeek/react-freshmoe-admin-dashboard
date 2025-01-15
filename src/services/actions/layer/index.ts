import { MAIN_SERVICE } from "@/services/apis";
import * as service from "@/services/apis/endpoints";
import { CreateLayer, Layer, UpdateLayer } from "@/types";

// Create
export async function createLayer(payload: CreateLayer) {
    return (await MAIN_SERVICE.post(service.CREATE_LAYER, payload))?.data;
}

// Read
export async function fetchLayerList(): Promise<Layer[]> {
    return (await MAIN_SERVICE.get(service.GET_LAYER_LIST))?.data.data;
}

export async function fetchLayerDetail(id: number) {
    return (await MAIN_SERVICE.get(service.GET_LAYER_LIST + "/" + id))?.data.data;
}

// Update
export async function updateLayer(payload: UpdateLayer, id: number) {
    return (
        await MAIN_SERVICE.post(service.UPDATE_LAYER + "/" + id, payload)
    )?.data;
}

// Delete
export async function deleteLayer(id: number | null) {
    return (await MAIN_SERVICE.delete(service.DELETE_LAYER + "/" + id))?.data.data;
}
