import { SidebarMenuButton } from '@/components/ui/sidebar';
import { IconType } from 'react-icons'; // Assuming icons are from react-icons
import { Link, useLocation } from 'react-router';

type MenuItem = {
   url:
      | {
           pathname?: string;
        }
      | string;
   icon?: IconType;
   title: string;
};

type CMenuButtonProps = {
   item: MenuItem;
};

const CMenuButton: React.FC<CMenuButtonProps> = ({ item }) => {
   const { pathname } = useLocation();
   const url =
      typeof item.url === 'string' ? item.url : item.url.pathname ?? '';

   return (
      <SidebarMenuButton
         asChild
         isActive={pathname === url}
         className={`h-auto p-0 ${
            pathname === url ? '!bg-c-button-bg !text-primary' : ''
         } hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary`}>
         <div>
            <Link
               className='flex items-end gap-2 w-full !text-base p-3'
               to={url}>
               {item.icon && <item.icon size='20' />}
               {item.title}
            </Link>
         </div>
      </SidebarMenuButton>
   );
};

export default CMenuButton;
