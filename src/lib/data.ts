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
         src: 'service-parameter',
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
         src: 'content-image',
         url: 'contents',
         items: [
            {
               title: 'Home',
               icon: LuDot,
               src: 'home',
               items: [
                  {
                     title: 'Section 1',
                     icon: LuDot,
                     src: 'section=1',
                     url: routes.content({ search: '?page=home&section=1' }),
                  },
                  {
                     title: 'Section 2',
                     icon: LuDot,
                     src: 'section=2',
                     url: routes.content({ search: '?page=home&section=2' }),
                  },
                  {
                     title: 'Section 3',
                     icon: LuDot,
                     src: 'section=3',
                     url: routes.content({ search: '?page=home&section=3' }),
                  },
               ],
            },
            {
               title: 'About',
               icon: LuDot,
               src: 'about_us',
               items: [
                  {
                     title: 'Section 1',
                     icon: LuDot,
                     src: 'section=1',
                     url: routes.content({
                        search: '?page=about_us&section=1',
                     }),
                  },
                  {
                     title: 'Section 2',
                     icon: LuDot,
                     src: 'section=2',
                     url: routes.content({
                        search: '?page=about_us&section=2',
                     }),
                  },
               ],
            },
            {
               title: 'Our Service',
               icon: LuDot,
               src: 'our_service',
               items: [
                  {
                     title: 'Section 1',
                     icon: LuDot,
                     src: 'section=1',
                     url: routes.content({
                        search: '?page=our_service&section=1',
                     }),
                  },
                  {
                     title: 'Section 2',
                     icon: LuDot,
                     src: 'section=2',
                     url: routes.content({
                        search: '?page=our_service&section=2',
                     }),
                  },
                  {
                     title: 'Section 3',
                     icon: LuDot,
                     src: 'section=3',
                     url: routes.content({
                        search: '?page=our_service&section=3',
                     }),
                  },
               ],
            },
            {
               title: 'Profile',
               icon: LuDot,
               src: 'profile',
               items: [
                  {
                     title: 'Section 1',
                     icon: LuDot,
                     src: 'section=1',
                     url: routes.content({
                        search: '?page=profile&section=1',
                     }),
                  },
                  {
                     title: 'Section 2',
                     icon: LuDot,
                     src: 'section=2',
                     url: routes.content({
                        search: '?page=profile&section=2',
                     }),
                  },
                  {
                     title: 'Section 3',
                     icon: LuDot,
                     src: 'section=3',
                     url: routes.content({
                        search: '?page=profile&section=3',
                     }),
                  },
                  {
                     title: 'Section 4',
                     icon: LuDot,
                     src: 'section=4',
                     url: routes.content({
                        search: '?page=profile&section=4',
                     }),
                  },
               ],
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
      header: 'Service Layer',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Service Layer', current: true },
      ],
   };

   pageHeaders[`${routes.layerCreate()}`] = {
      header: 'Create',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Service Layer', path: () => routes.layer(), current: true },
         { value: 'Create', current: true }, // The current page
      ],
   };

   pageHeaders[`${routes.layerEdit('')}`] = {
      header: 'Edit',
      links: [
         { value: 'Service Parameter', current: false },
         { value: 'Service Layer', path: () => routes.layer(), current: false }, // Previous "Layer" page
         { value: 'Edit', current: true },
      ],
   };

   pageHeaders[`${routes.serviceArea()}`] = {
      header: 'Service Area',
      links: [
         { value: 'Service Parameter', current: false },
         {
            value: 'Service Area',
            path: () => routes.serviceArea(),
            current: false,
         },
      ],
   };

   pageHeaders[`${routes.serviceAreaCreate()}`] = {
      header: 'Service Area Create',
      links: [
         { value: 'Service Parameter', current: false },
         {
            value: 'Service Area',
            path: () => routes.serviceArea(),
            current: false,
         }, // Links back to the "Layer" page
         { value: 'Create', current: true },
      ],
   };

   pageHeaders[`${routes.serviceAreaEdit('')}`] = {
      header: 'Edit',
      links: [
         { value: 'Service Parameter', current: false },
         {
            value: 'Service Area',
            path: () => routes.serviceArea(),
            current: false,
         },
         { value: 'Edit', current: true },
      ],
   };

   // Content & Image - Home
   pageHeaders[`${routes.content()}`] = {
      header: 'Home',
      links: [
         { value: 'Content & Image', current: false },
         { value: 'Home', path: () => routes.content(), current: true },
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
