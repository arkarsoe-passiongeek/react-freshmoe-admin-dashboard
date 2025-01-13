import { RxDashboard } from "react-icons/rx";
import { LuDot } from "react-icons/lu";
import { getRoutes, Routes } from "./route";
import { Home } from "lucide-react";

export const getSidebarData = (routes: Routes) => {
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
        ]
    };

    pageHeaders[`${routes.layerCreate()}`] = {
        header: 'Layer Create',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Layer', path: () => routes.layer(), current: false }, // Links back to the "Layer" page
            { value: 'Layer Create', current: true } // The current page
        ]
    };


    pageHeaders[`${routes.layerEdit('')}`] = {
        header: 'Layer Edit',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Layer', path: () => routes.layer(), current: false }, // Previous "Layer" page
            { value: (value: any) => value, current: false }, // Dynamic Layer URL (if applicable)
            { value: 'Layer Edit', current: true }
        ]
    };

    // Service Parameter - Priority
    pageHeaders[`${routes.priority()}`] = {
        header: 'Priority',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Priority', path: () => routes.priority(), current: true },
        ]
    };

    pageHeaders[`${routes.priorityCreate()}`] = {
        header: 'Priority Create',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Priority', path: () => routes.priority(), current: false }, // Links back to the "Priority" page
            { value: 'Priority Create', current: true } // The current page
        ]
    };

    pageHeaders[`${routes.priorityEdit('')}`] = {
        header: 'Priority Edit',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Priority', path: () => routes.priority(), current: false }, // Previous "Priority" page
            { value: (value: any) => value, current: false }, // Dynamic Priority URL (if applicable)
            { value: 'Priority Edit', current: true } // The current page
        ]
    };

    pageHeaders[`${routes.layerPriority()}`] = {
        header: 'Layer-Priority',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Layer-Priority', path: () => routes.layerPriority(), current: true },
        ]
    };

    pageHeaders[`${routes.layerPriorityCreate()}`] = {
        header: 'Layer-Priority Create',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Layer-Priority', path: () => routes.layerPriority(), current: false }, // Links back to the "Layer" page
            { value: 'Layer-Priority Create', current: true } // The current page
        ]
    };

    pageHeaders[`${routes.layerPriorityEdit('')}`] = {
        header: 'Layer-Priority Edit',
        links: [
            { value: 'Service Parameter', current: false },
            { value: 'Layer-Priority', path: () => routes.layerPriority(), current: false },
            { value: (value: any) => value, current: false }, // Dynamic Layer-Priority URL (if applicable)
            { value: 'Layer-Priority Edit', current: true } // The current page
        ]
    };

    // Content & Image - Home
    pageHeaders[`${routes.contentHome()}`] = {
        header: 'Home',
        links: [
            { value: 'Content & Image', current: false },
            { value: 'Home', path: () => routes.contentHome(), current: true },
        ]
    };

    // Maintenance
    pageHeaders[`${routes.maintenance()}`] = {
        header: 'Maintenance',
        links: [
            { value: 'Maintenance', path: () => routes.maintenance(), current: true },
        ]
    };

    return pageHeaders;
};

const pageHeaders = getPageHeaders();

export const getPageHeader = (pathname: string): PageHeader => {
    return pageHeaders[pathname] || { header: '', links: [] }; // Return headers for the current path or fallback
};
