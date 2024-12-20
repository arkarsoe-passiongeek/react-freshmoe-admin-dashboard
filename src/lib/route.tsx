export const getRoutes = (locale: string) => {
    let currentLocale = ''
    if (locale) currentLocale = `/${locale}`

    return {
        contentHome: () => `${currentLocale}/content-image/home`,
        dashboard: () => `${currentLocale}/`,
        maintenance: () => `${currentLocale}/maintenance`,
        layer: () => `${currentLocale}/service-parameter/layer`,
        layerCreate: () => `${currentLocale}/service-parameter/layer/create-layer`,
        layerEdit: (id: string) => `/service-parameter/layer/${id}/edit-layer`,
        priority: () => `${currentLocale}/service-parameter/priority`,
        priorityCreate: () => `${currentLocale}/service-parameter/priority/create-priority`,
        priorityEdit: (id: string) => `/service-parameter/priority/${id}/edit-priority`,
        layerPriority: () => `${currentLocale}/service-parameter/layer-priority`,
        layerPriorityCreate: () => `${currentLocale}/service-parameter/layer-priority/create-layer-priority`,
        layerPriorityEdit: (id: string) => `${currentLocale}/service-parameter/layer-priority/${id}/edit-layer-priority`,
        paths: () => `${currentLocale}/service-parameter/layer-priority/paths`,
    }
}