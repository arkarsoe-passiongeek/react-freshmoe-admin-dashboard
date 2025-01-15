/**
 * endpoints are all the same, but I intentionally set them different variables because it might change it future or not.
 */
// layer
export const GET_LAYER_LIST = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

export const CREATE_LAYER = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

export const UPDATE_LAYER = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

export const DELETE_LAYER = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/layers";

// priority
export const GET_PRIORITY_LIST = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";

export const CREATE_PRIORITY = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";

export const UPDATE_PRIORITY = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";

export const DELETE_PRIORITY = import.meta.env.VITE_PUBLIC_APP_BASE_URL + "/api/v1/priorities";