import { paths } from './paths';

// Define types for page headers and links
interface PageHeaderLink {
   value: string | ((value: string) => string);
   path?: (id: string) => string;
   current?: boolean;
}

interface PageHeader {
   header: string;
   links: PageHeaderLink[];
}

const getPageHeaders = (): Record<string, PageHeader> => {
   const pageHeaders: Record<string, PageHeader> = {};

   // Dashboard
   pageHeaders[paths.root.path] = { header: 'Dashboard', links: [] };

   // Layer
   pageHeaders[paths.layer.path] = {
      header: 'Service Layer',
      links: [{ value: 'Service Layer', current: true }],
   };

   pageHeaders[paths.layer.create.path] = {
      header: 'Create',
      links: [
         { value: 'Layer', path: () => paths.layer.path },
         { value: 'Create', current: true },
      ],
   };

   pageHeaders[paths.layer.edit.getHref('')] = {
      header: 'Edit',
      links: [
         { value: 'Layer', path: () => paths.layer.path },
         {
            value: 'Edit',
            current: true,
         },
      ],
   };

   pageHeaders[paths.layer.view.getHref('')] = {
      header: 'Layer',
      links: [
         { value: 'Layer', path: () => paths.layer.path },
         { value: 'Detail', current: true },
      ],
   };

   pageHeaders[paths.serviceArea.path] = {
      header: 'Service Area',
      links: [{ value: 'Service Area', path: () => paths.serviceArea.path, current: false }],
   };

   pageHeaders[paths.serviceArea.create.path] = {
      header: 'Create',
      links: [
         { value: 'Service Area', path: () => paths.serviceArea.path },
         { value: 'Create', current: true },
      ],
   };

   pageHeaders[paths.serviceArea.edit.getHref('')] = {
      header: 'Edit',
      links: [
         { value: 'Service Area', path: () => paths.serviceArea.path },
         {
            value: 'Edit',
            current: true,
         },
      ],
   };

   return pageHeaders;
};

const pageHeaders = getPageHeaders();

export const getPageHeader = (pathname: string): PageHeader => {
   return pageHeaders[pathname] || { header: '', links: [] }; // Return headers for the current path or fallback
};
