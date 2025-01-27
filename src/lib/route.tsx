import { useMemo } from 'react';
import { useIntl } from 'react-intl';

// Define the Routes interface
export interface Routes {
   content: (payload?: { search?: string }) => string;
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
   serviceArea: (payload?: { search?: string }) => string;
   serviceAreaCreate: () => string;
   serviceAreaEdit: (id: string) => string;
   paths: () => string;
   unauthorized: () => string;
   profile: () => string;
   changePassword: () => string;
}

// Interface for the GetRoutes function props
interface GetRoutesProps {
   locale?: string;
}

// Function to generate routes based on the current locale
export const getRoutes = (props: GetRoutesProps): Routes => {
   let currentLocale = '';
   if (props && props.locale) currentLocale = `/${props.locale}`;

   return {
      // content: (): string => `${currentLocale}/content-image`,
      content: (payload?: { search?: string }): string => {
         const pathname = `${currentLocale}/content-image`;
         return payload && payload.search
            ? `${pathname}${payload.search}`
            : pathname;
      },
      dashboard: (): string => `${currentLocale}/`,
      maintenance: (): string => `${currentLocale}/maintenance`,
      layer: (): string => `${currentLocale}/service-parameter/layer`,
      layerCreate: (): string =>
         `${currentLocale}/service-parameter/layer/create-layer`,
      layerEdit: (id: string): string =>
         `${currentLocale}/service-parameter/layer${
            id ? '/' + id : ''
         }/edit-layer`,
      priority: (): string => `${currentLocale}/service-parameter/priority`,
      priorityCreate: (): string =>
         `${currentLocale}/service-parameter/priority/create-priority`,
      priorityEdit: (id: string): string =>
         `${currentLocale}/service-parameter/priority${
            id ? '/' + id : ''
         }/edit-priority`,
      layerPriority: (): string =>
         `${currentLocale}/service-parameter/layer-priority`,
      layerPriorityCreate: (): string =>
         `${currentLocale}/service-parameter/layer-priority/create-layer-priority`,
      layerPriorityEdit: (id: string): string =>
         `${currentLocale}/service-parameter/layer-priority${
            id ? '/' + id : ''
         }/edit-layer-priority`,
      serviceArea: (payload?: { search?: string }): string => {
         const pathname = `${currentLocale}/service-parameter/service-area`;
         return payload && payload.search
            ? `${pathname}${payload.search}`
            : pathname;
      },
      serviceAreaCreate: (): string =>
         `${currentLocale}/service-parameter/service-area/create-service-area`,
      serviceAreaEdit: (id: string): string =>
         `${currentLocale}/service-parameter/service-area${
            id ? '/' + id : ''
         }/edit-service-area`,
      paths: (): string =>
         `${currentLocale}/service-parameter/layer-priority/paths`,
      unauthorized: (): string => `${currentLocale}/auth/unauthorized`,
      profile: (): string => `${currentLocale}/profile-management/profile`,
      changePassword: (): string =>
         `${currentLocale}/profile-management/change-password`,
   };
};

// Hook to retrieve routes with the current locale
export const useLinkRoutes = (): Routes => {
   const { locale } = useIntl();

   return useMemo(() => {
      return getRoutes({ locale });
   }, [locale]);
};
