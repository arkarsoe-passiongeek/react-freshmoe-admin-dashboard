import FreshMoeLogo from "@/assets/images/freshmoeLogo.png";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarData } from "@/lib/data";
import { useLinkRoutes } from "@/lib/route";
import { ChevronRight } from "lucide-react";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import CMenuButton from "./c-menu-button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navLinks, setNavLinks] = React.useState([]);
  const routes = useLinkRoutes();
  const data = getSidebarData(routes);

  React.useEffect(() => {
    setNavLinks(data as any);
  }, []);

  return (
    <Sidebar className="top-[50px] py-6 px-2 bg-c-white" {...props}>
      <SidebarHeader>
        <img
          src={FreshMoeLogo}
          alt="logo"
          className="w-[159px] h-[71px] mx-auto mb-6"
        />
      </SidebarHeader>
      <SidebarContent className="gap-2">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {navLinks &&
          navLinks.length > 0 &&
          navLinks.map((item: any) => {
            if (item.items) {
              return (
                <Collapsible
                  key={uuidv4()}
                  title={item.title}
                  className="group/collapsible list-none"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="p-3 h-auto"
                        asChild
                      >
                        <div className="">
                          {item.icon && (
                            <div className="shrink-0">
                              <item.icon />
                            </div>
                          )}
                          <span className="text-base">{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu>
                      {item.items.map((each: any) => (
                        <SidebarMenuItem key={uuidv4()}>
                          <CMenuButton item={each} />
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              );
            } else {
              return (
                <SidebarMenuItem key={uuidv4()} className="list-none">
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
