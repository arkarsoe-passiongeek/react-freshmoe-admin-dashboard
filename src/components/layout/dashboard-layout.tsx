import { useContext, useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import PageHeader from "./page-header";
import AdminController from "./account-controller";
import { getUser } from "@/services/apis/user";
import Cookies from 'js-cookie'
import { LanguageContext } from "./language-handler";
import { useIntl } from "react-intl";
import { useLinkRoutes } from "@/lib/route";

const DashboardLayout = () => {
    const [user, setUser] = useState({})
    const { language, setLanguage }: any = useContext(LanguageContext)
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const { lang } = useParams();
    const routes = useLinkRoutes()

    const getUserData = async () => {
        const res = await getUser()
        setUser(res.data.data)
        localStorage.setItem('userdata', JSON.stringify(res.data.data))
    }

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate(routes.unauthorized())
        }
        console.log(Cookies.get('test'))
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
                            <select className="hidden" defaultValue={language} name="tet" id="test" onChange={(e) => {
                                setLanguage(e.target.value)
                                console.log(pathname.replace(lang ?? '', e.target.value), language, lang)
                                navigate(`${pathname.replace(lang ?? '', e.target.value) + search}`)
                            }}>
                                <option value="en">en</option>
                                <option value="fr">fr</option>
                            </select>
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