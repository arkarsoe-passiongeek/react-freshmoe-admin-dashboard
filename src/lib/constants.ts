export const ROWS_PER_PAGE = [5, 10, 20]
export const LOCALES = ['en', 'mm']
export const CONSTANTS = {
    'USER_INFO': 'userInfo',
    'TOKEN': 'token'
}
export const API_ROUTES = {
    dashboard: {
        get: () => `/dashboard`,
    },
    layer: {
        getAll: () => `/layers`,
        create: () => `/layers/create`,
        edit: (id: string | number) => `/layers/edit/${id}`,
        view: (id: string | number) => `/layers/${id}`,
    },
    priority: {
        getAll: () => `/priorities`,
        create: () => `/priorities/create`,
        edit: (id: string | number) => `/priorities/edit/${id}`,
        view: (id: string | number) => `/priorities/${id}`,
    },
    layerPriority: {
        getAll: () => `/layer-priorities`,
        create: () => `/layer-priorities/create`,
        edit: (id: string | number) => `/layer-priorities/edit/${id}`,
        view: (id: string | number) => `/layer-priorities/${id}`,
    },
    contentHome: {
        get: () => `/content/home`,
    },
    maintenance: {
        get: () => `/maintenance`,
    },
};
