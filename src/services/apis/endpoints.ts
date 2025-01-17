/**
 * Endpoints are all the same, but I intentionally set them to different variables because they might change in the future or not.
 */

// Layer
export const GET_LAYER_LIST =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

export const CREATE_LAYER =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

export const UPDATE_LAYER =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

export const DELETE_LAYER =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

// Priority
export const GET_PRIORITY_LIST =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";

export const CREATE_PRIORITY =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";

export const UPDATE_PRIORITY =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";

export const DELETE_PRIORITY =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";

// Layer Priority
export const GET_LAYER_PRIORITY_LIST =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layer-priority";

export const CREATE_LAYER_PRIORITY =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layer-priority";

export const UPDATE_LAYER_PRIORITY =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layer-priority";

export const DELETE_LAYER_PRIORITY =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layer-priority";

// Maintenance
export const GET_MAINTENANCE_LIST =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/maintenance";

export const CHANGE_MAINTENANCE =
  import.meta.env.VITE_PUBLIC_APP_BASE_URL +
  "/api/v1/maintenance/change-status";
