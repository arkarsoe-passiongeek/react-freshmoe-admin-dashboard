import { useMemo } from "react";
import { useIntl } from "react-intl";

// Define the Routes interface
export interface Routes {
  contentHome: () => string;
  dashboard: () => string;
  maintenance: () => string;
  layer: () => string;
  layerCreate: () => string;
  layerEdit: (id: string) => string;
  priority: () => string;
  priorityCreate: () => string;
  priorityEdit: (id: string) => string;
  layerPriority: () => string;
  layerPriorityCreate: () => string;
  layerPriorityEdit: (id: string) => string;
  paths: () => string;
  unauthorized: () => string;
  profile: () => string;
  changePassword: () => string;
}

interface GetRoutesProps {
  locale?: string;
}

// Function to generate routes based on the current locale
export const getRoutes = (props: GetRoutesProps): Routes => {
  let currentLocale = "";
  if (props && props.locale) currentLocale = `/${props.locale}`;

  return {
    contentHome: () => `${currentLocale}/content-image/home`,
    dashboard: () => `${currentLocale}/`,
    maintenance: () => `${currentLocale}/maintenance`,
    layer: () => `${currentLocale}/service-parameter/layer`,
    layerCreate: () => `${currentLocale}/service-parameter/layer/create-layer`,
    layerEdit: (id: string) =>
      `${currentLocale}/service-parameter/layer${
        id ? "/" + id : ""
      }/edit-layer`,
    priority: () => `${currentLocale}/service-parameter/priority`,
    priorityCreate: () =>
      `${currentLocale}/service-parameter/priority/create-priority`,
    priorityEdit: (id: string) =>
      `${currentLocale}/service-parameter/priority${
        id ? "/" + id : ""
      }/edit-priority`,
    layerPriority: () => `${currentLocale}/service-parameter/layer-priority`,
    layerPriorityCreate: () =>
      `${currentLocale}/service-parameter/layer-priority/create-layer-priority`,
    layerPriorityEdit: (id: string) =>
      `${currentLocale}/service-parameter/layer-priority${
        id ? "/" + id : ""
      }/edit-layer-priority`,
    paths: () => `${currentLocale}/service-parameter/layer-priority/paths`,
    unauthorized: () => `${currentLocale}/auth/unauthorized`,
    profile: () => `${currentLocale}/profile-management/profile`,
    changePassword: () => `${currentLocale}/profile-management/change-password`,
  };
};

// Hook to retrieve routes with the current locale
export const useLinkRoutes = (): Routes => {
  const { locale } = useIntl();

  return useMemo(() => {
    return getRoutes({ locale });
  }, [locale]);
};
