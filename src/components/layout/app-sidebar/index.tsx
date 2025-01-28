import FreshMoeLogo from '@/assets/images/freshmoeLogo.png';
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
import { getSidebarData } from '@/lib/data';
import { useLinkRoutes } from '@/lib/route';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';
import { useLocation } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import CMenuButton from './c-menu-button';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const [navLinks, setNavLinks] = React.useState([]);
   const routes = useLinkRoutes();
   const data = getSidebarData(routes);
   const { pathname, search } = useLocation();

   React.useEffect(() => {
      setNavLinks(data as any);
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
            {/* We create a collapsible SidebarGroup for each parent. */}
            {navLinks &&
               navLinks.length > 0 &&
               navLinks.map((item: any) => {
                  if (item.items) {
                     return (
                        <Collapsible
                           key={uuidv4()}
                           title={item.title}
                           className='group/collapsible list-none'>
                           <CollapsibleTrigger asChild>
                              <SidebarMenuItem>
                                 <SidebarMenuButton
                                    className={cn(
                                       'p-3 h-auto hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary mb-1',
                                       (pathname.includes(item.src) ||
                                          search.includes(item.src)) &&
                                          'bg-c-active-bg text-primary'
                                    )}
                                    asChild>
                                    <div className=''>
                                       {item.icon && (
                                          <div className='shrink-0'>
                                             <item.icon />
                                          </div>
                                       )}
                                       <span className='text-base'>
                                          {item.title}
                                       </span>
                                       <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                                    </div>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           </CollapsibleTrigger>
                           <CollapsibleContent>
                              <SidebarMenu>
                                 {item.items.map((each: any) => {
                                    if (each.items) {
                                       return (
                                          <Collapsible
                                             key={uuidv4()}
                                             title={each.title}
                                             className='group/collapsible-2 list-none'>
                                             <CollapsibleTrigger asChild>
                                                <SidebarMenuItem>
                                                   <SidebarMenuButton
                                                      className={cn(
                                                         'p-3 h-auto hover:bg-c-active-bg hover:text-primary active:bg-c-active-bg active:text-primary mb-1',
                                                         (pathname.includes(
                                                            each.src
                                                         ) ||
                                                            search.includes(
                                                               each.src
                                                            )) &&
                                                            'bg-c-active-bg text-primary'
                                                      )}
                                                      asChild>
                                                      <div className=''>
                                                         {each.icon && (
                                                            <div className='shrink-0'>
                                                               <each.icon />
                                                            </div>
                                                         )}
                                                         <span className='text-base'>
                                                            {each.title}
                                                         </span>
                                                         <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible-2:rotate-90' />
                                                      </div>
                                                   </SidebarMenuButton>
                                                </SidebarMenuItem>
                                             </CollapsibleTrigger>
                                             <CollapsibleContent>
                                                <SidebarMenu>
                                                   {each.items.map(
                                                      (nestedEach: any) => (
                                                         <SidebarMenuItem
                                                            key={uuidv4()}>
                                                            <CMenuButton
                                                               item={nestedEach}
                                                            />
                                                         </SidebarMenuItem>
                                                      )
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
