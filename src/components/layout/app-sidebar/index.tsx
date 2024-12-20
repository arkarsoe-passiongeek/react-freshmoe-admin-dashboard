import * as React from "react"
import FreshMoeLogo from "@/assets/images/freshmoeLogo.png"
import { ChevronRight, Home } from "lucide-react"
import { LuDot } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import CMenuButton from "./c-menu-button"
import { v4 as uuidv4 } from 'uuid';
import { getRoutes } from "@/lib/route";
import { useIntl } from "react-intl";

export const getData = (routes: any) => {
    return [
        {
            title: "Dashboard",
            icon: Home,
            url: routes.dashboard()
        },
        {
            title: "Service Parameter",
            icon: RxDashboard,
            url: "#1",
            items: [
                {
                    title: "Layer",
                    icon: LuDot,
                    url: routes.layer(),
                },
                {
                    title: "Priority",
                    icon: LuDot,
                    url: routes.priority(),
                },
                {
                    title: "Layer-Priority",
                    icon: LuDot,
                    url: { pathname: routes.layerPriority(), query: { layer: 'continent', paths: '/continent' } },
                }
            ],
        },
        {
            title: "Content & Image",
            icon: RxDashboard,
            url: "#2",
            items: [
                {
                    title: "Home",
                    icon: LuDot,
                    url: routes.contentHome(),
                }
            ],
        },
        {
            title: "Maintenance",
            icon: RxDashboard,
            url: routes.maintenance()
        },
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [navLinks, setNavLinks] = React.useState([])
    const { locale } = useIntl()
    const routes = getRoutes(locale)
    const data = getData(routes)

    React.useEffect(() => {
        setNavLinks(data as any)
    }, [])

    return (
        <Sidebar className="top-[50px] py-6 px-2 bg-c-white" {...props}>
            <SidebarHeader>
                <img src={FreshMoeLogo} alt="logo" className="w-[159px] h-[71px] mx-auto mb-6" />
            </SidebarHeader>
            <SidebarContent className="gap-2">
                {/* We create a collapsible SidebarGroup for each parent. */}
                {navLinks && navLinks.length > 0 && navLinks.map((item: any) => {
                    if (item.items) {
                        return (
                            <Collapsible
                                key={uuidv4()}
                                title={item.title}
                                className="group/collapsible list-none"
                            >
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="p-3 h-auto" asChild>
                                            <div className="[&_svg]:w-6 [&_svg]:h-6">
                                                {item.icon && <item.icon />}
                                                <span className="text-base">{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenu>
                                        {
                                            item.items.map((each: any) => (
                                                <SidebarMenuItem key={uuidv4()}>
                                                    <CMenuButton item={each} />
                                                </SidebarMenuItem>
                                            ))
                                        }
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </Collapsible>
                        )
                    } else {
                        return (
                            <SidebarMenuItem key={uuidv4()} className="list-none">
                                <CMenuButton item={item} />
                            </SidebarMenuItem>
                        )
                    }
                })}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
