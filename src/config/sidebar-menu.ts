import { Dot, LayoutDashboard, LucideIcon, Waypoints } from 'lucide-react';
import { paths } from './paths';

export type TSidebarMenuItem = {
   key: number;
   label: string;
   icon: LucideIcon;
   path?: string;
   src?: string;
   children?: TSidebarMenuItem[];
};

export const sidebarMenuItems: TSidebarMenuItem[] = [
   {
      key: 1,
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: paths.root.path,
   },
   {
      key: 4,
      label: 'Service Parameter',
      icon: Waypoints,
      src: 'service-parameter',
      children: [
         {
            key: 21,
            label: 'Service Layer',
            icon: Dot,
            path: paths.layer.path,
         },
         {
            key: 4,
            label: 'Service Area',
            icon: Dot,
            path: paths.serviceArea.path,
         },
      ],
   },
] as const;
