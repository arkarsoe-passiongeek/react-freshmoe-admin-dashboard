import { MAIN_SERVICE } from "@/services/apis";
import * as service from "@/services/apis/endpoints";

// Create
export async function changeMaintenanceStatus(payload) {
  return (await MAIN_SERVICE.post(service.CHANGE_MAINTENANCE, payload))?.data;
}

// Read
export async function fetchMaintenanceStatus() {
  return (await MAIN_SERVICE.get(service.GET_MAINTENANCE_LIST))?.data.data;
}
