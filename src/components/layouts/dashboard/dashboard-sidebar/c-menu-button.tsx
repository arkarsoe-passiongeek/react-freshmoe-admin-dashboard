import { SidebarMenuButton } from '@/components/ui/sidebar';
import { TSidebarMenuItem } from '@/config/sidebar-menu';
import { Link, useLocation } from 'react-router';

type CMenuButtonProps = {
   item: TSidebarMenuItem;
};

const CMenuButton = ({ item }: CMenuButtonProps) => {
   const { pathname, search } = useLocation();
   const url = typeof item.path === 'string' ? item.path : (item.path ?? '');

   return (
      <SidebarMenuButton
         asChild
         isActive={pathname === url || pathname + search === item.path}
         className={`h-auto p-0 ${
            pathname === url || pathname + search === url
               ? '!bg-c-button-bg !text-primary'
               : ''
         } hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary`}>
         <div>
            <Link
               className='flex items-end gap-2 w-full !text-base p-3'
               to={url}>
               {item.icon && <item.icon size='20' />}
               {item.label}
            </Link>
         </div>
      </SidebarMenuButton>
   );
};

export default CMenuButton;
