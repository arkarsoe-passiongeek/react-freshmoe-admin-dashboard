import IconAlert from '@/components/icons/IconAlert';
import IconDashboard from '@/components/icons/IconDashboard';
import IconHamburger from '@/components/icons/IconHamburger';
import IconService from '@/components/icons/IconService';
import { LuDot } from 'react-icons/lu';
import { getRoutes, Routes } from './route';

export const getSidebarData = (routes: Routes) => {
   return [
      {
         title: 'Dashboard',
         icon: IconDashboard,
         url: routes.dashboard(),
      },
      {
         title: 'Service Parameter',
         icon: IconService,
         url: '#1',
         items: [
            {
               title: 'Service Layer',
               icon: LuDot,
               url: routes.layer(),
            },
            {
               title: 'Service Area',
               icon: LuDot,
               url: {
                  pathname: routes.serviceArea(),
               },
            },
         ],
      },
      {
         title: 'Content & Image',
         icon: IconHamburger,
         url: '#2',
         items: [
            {
               title: 'Home',
               icon: LuDot,
               url: routes.contentHome(),
            },
         ],
      },
      {
         title: 'Maintenance',
         icon: IconAlert,
         url: routes.maintenance(),
      },
   ];
};

interface PageHeader {
   header: string;
   links: any[];
}

const getPageHeaders = () => {
   const routes: Routes = getRoutes({}); // Retrieve all routes
   const pageHeaders: Record<string, PageHeader> = {};

   // Dashboard
   pageHeaders[`${routes.dashboard()}`] = { header: 'Dashboard', links: [] };

   // Service Parameter - Layer
   pageHeaders[`${routes.layer()}`] = {
      header: 'Layer',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Layer', path: () => routes.layer(), current: true },
      ],
   };

   pageHeaders[`${routes.layerCreate()}`] = {
      header: 'Create',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Create', current: true }, // The current page
      ],
   };

   pageHeaders[`${routes.layerEdit('')}`] = {
      header: 'Edit',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Layer', path: () => routes.layer(), current: false }, // Previous "Layer" page
         { value: 'Edit', current: true },
      ],
   };

   // Service Parameter - Priority
   pageHeaders[`${routes.priority()}`] = {
      header: 'Priority',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Priority', path: () => routes.priority(), current: true },
      ],
   };

   pageHeaders[`${routes.priorityCreate()}`] = {
      header: 'Priority Create',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Priority', path: () => routes.priority(), current: false }, // Links back to the "Priority" page
         { value: 'Priority Create', current: true }, // The current page
      ],
   };

   pageHeaders[`${routes.priorityEdit('')}`] = {
      header: 'Priority Edit',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Priority', path: () => routes.priority(), current: false }, // Previous "Priority" page
         { value: (value: any) => value, current: false }, // Dynamic Priority URL (if applicable)
         { value: 'Priority Edit', current: true }, // The current page
      ],
   };

   pageHeaders[`${routes.layerPriority()}`] = {
      header: 'Layer-Priority',
      links: [
         { value: 'Service Parameter', current: false },
         {
            value: 'Layer-Priority',
            path: () => routes.layerPriority(),
            current: false,
         },
      ],
   };

   pageHeaders[`${routes.layerPriorityCreate()}`] = {
      header: 'Layer-Priority Create',
      links: [
         { value: 'Service Parameter', current: false },
         {
            value: 'Layer-Priority',
            path: () => routes.layerPriority(),
            current: false,
         }, // Links back to the "Layer" page
      ],
   };

   pageHeaders[`${routes.layerPriorityEdit('')}`] = {
      header: 'Layer-Priority Edit',
      links: [
         { value: 'Service Parameter', current: false },
         {
            value: 'Layer-Priority',
            path: () => routes.layerPriority(),
            current: false,
         },
      ],
   };

   // Content & Image - Home
   pageHeaders[`${routes.contentHome()}`] = {
      header: 'Home',
      links: [
         { value: 'Content & Image', current: false },
         { value: 'Home', path: () => routes.contentHome(), current: true },
      ],
   };

   // Maintenance
   pageHeaders[`${routes.maintenance()}`] = {
      header: 'Maintenance',
      links: [
         {
            value: 'Maintenance',
            path: () => routes.maintenance(),
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
