import FreshMoeLogo from '@/assets/media/images/freshmoeLogo.png';
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
   Sidebar,
   SidebarContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from '@/components/ui/sidebar';
import { sidebarMenuItems, TSidebarMenuItem } from '@/config/sidebar-menu';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';
import { useLocation } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import CMenuButton from './c-menu-button';

export function DashboardSidebar({
   ...props
}: React.ComponentProps<typeof Sidebar>) {
   const [navLinks, setNavLinks] = React.useState<TSidebarMenuItem[]>([]);
   const { pathname, search } = useLocation();

   React.useEffect(() => {
      setNavLinks(sidebarMenuItems);
   }, []);

   return (
      <Sidebar className='top-[50px] py-6 px-2 bg-c-white' {...props}>
         <SidebarHeader>
            <img
               src={FreshMoeLogo}
               alt='logo'
               className='w-[159px] h-[71px] mx-auto mb-6'
            />
         </SidebarHeader>
         <SidebarContent className='gap-2'>
            {navLinks.map(item => {
               if (item.children && item.children.length > 0) {
                  return (
                     <Collapsible
                        key={uuidv4()}
                        title={item.label}
                        className='group/collapsible list-none'>
                        <CollapsibleTrigger asChild>
                           <SidebarMenuItem>
                              <SidebarMenuButton
                                 className={cn(
                                    'p-3 h-auto hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary mb-1',
                                    (pathname === item.path?.split('?')[0] ||
                                       pathname.includes(item.src ?? '')) &&
                                       'bg-c-active-bg text-primary',
                                 )}
                                 asChild>
                                 <div>
                                    {item.icon && (
                                       <div className='shrink-0'>
                                          <item.icon />
                                       </div>
                                    )}
                                    <span className='text-base'>
                                       {item.label}
                                    </span>
                                    <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                                 </div>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                           <SidebarMenu>
                              {item.children.map(each => {
                                 if (each.children) {
                                    return (
                                       <Collapsible
                                          key={uuidv4()}
                                          title={each.label}
                                          className='group/collapsible-2 list-none'>
                                          <CollapsibleTrigger asChild>
                                             <SidebarMenuItem>
                                                <SidebarMenuButton
                                                   className={cn(
                                                      'p-3 h-auto hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary mb-1',
                                                      (pathname === item.path ||
                                                         pathname.includes(
                                                            each.src ?? '',
                                                         ) ||
                                                         search.includes(
                                                            each.src ?? '',
                                                         )) &&
                                                         'bg-c-active-bg text-primary',
                                                   )}
                                                   asChild>
                                                   <div className=''>
                                                      {each.icon && (
                                                         <div className='shrink-0'>
                                                            <each.icon />
                                                         </div>
                                                      )}
                                                      <span className='text-base'>
                                                         {each.label}
                                                      </span>
                                                      <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible-2:rotate-90' />
                                                   </div>
                                                </SidebarMenuButton>
                                             </SidebarMenuItem>
                                          </CollapsibleTrigger>
                                          <CollapsibleContent>
                                             <SidebarMenu>
                                                {each.children.map(
                                                   (nestedEach: any) => (
                                                      <SidebarMenuItem
                                                         className='pl-3'
                                                         key={uuidv4()}>
                                                         <CMenuButton
                                                            item={nestedEach}
                                                         />
                                                      </SidebarMenuItem>
                                                   ),
                                                )}
                                             </SidebarMenu>
                                          </CollapsibleContent>
                                       </Collapsible>
                                    );
                                 } else {
                                    return (
                                       <SidebarMenuItem key={uuidv4()}>
                                          <CMenuButton item={each} />
                                       </SidebarMenuItem>
                                    );
                                 }
                              })}
                           </SidebarMenu>
                        </CollapsibleContent>
                     </Collapsible>
                  );
               } else {
                  return (
                     <SidebarMenuItem key={uuidv4()} className='list-none'>
                        <CMenuButton item={item} />
                     </SidebarMenuItem>
                  );
               }
            })}
         </SidebarContent>
         <SidebarRail />
      </Sidebar>
   );
}
