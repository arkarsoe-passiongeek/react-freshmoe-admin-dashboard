import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import PageHeader from "./page-header";
import AdminController from "./account-controller";
import { getUser } from "@/services/apis/user";
import Cookies from 'js-cookie'

const DashboardLayout = () => {
    const [user, setUser] = useState({})

    const getUserData = async () => {
        const res = await getUser()
        setUser(res.data.data)
    }

    useEffect(() => {
        console.log(Cookies.get(''))
        getUserData()
    }, [])

    return (
        <div>
            <div style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
                <div className="bg-c-primary w-full p-[20px]"></div>
                <div className="bg-c-white w-full p-[1px]"></div>
                <div className="bg-c-secondary w-full p-[3.95px]"></div>
            </div>
            <div className="relative">
                <SidebarProvider>
                    <AppSidebar />
                    <main className="mt-[50px] w-full">
                        <div className="flex justify-between items-center p-3 bg-c-white border-b border-c-border-stroke">
                            <SidebarTrigger className="[&_svg]:size-8" />
                            <AdminController user={user} />
                        </div>
                        <div className="p-6">
                            <PageHeader />
                            <Outlet />
                        </div>
                    </main>
                </SidebarProvider>
            </div>
        </div>
    )
}

export default DashboardLayout