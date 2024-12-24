import { Link } from "@/i18n/routing"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cleanWords } from "@/lib/utils"
import { HiSlash } from "react-icons/hi2";
import React, { useEffect } from "react";
import useSearchParams from "@/hooks/use-search-params";
import usePathname from "@/hooks/use-pathname";
import { useLinkRoutes } from "@/lib/route";
import { getLayersArr } from "@/mock/layer";
import { useIntl } from "react-intl";

const PageHeader = (params: any) => {
    const { locale } = useIntl()
    const searchParams = useSearchParams()
    const uriPaths: any = searchParams.get('paths') ?? ''
    const pathname = params.pathname ?? usePathname()
    useEffect(() => {
        console.log(pathname)
    }, [])
    const routes = useLinkRoutes()
    const noRoute = 'service-parameter'
    let paths = pathname.split('/')
    const isCurrentPath = (path: string) => {
        return paths[paths.length - 1] === path
    }

    const getLastHref = (end: number, path: any) => {
        console.log(path)
        return paths.slice(0, end + 1).join('/')
    }

    const getHrefWithPaths = (end: any, path: any) => {
        const decodedURI = decodeURIComponent(uriPaths)
        console.log(decodedURI)
        const actualPaths = decodedURI.split('/').slice(0, end - 2).join('/')
        let url: any = { pathname: routes.layerPriority(), query: {} }
        if (path !== 'layer-priority') {
            url.query.paths = `${actualPaths}`
            url.query.src = path
            url.query.layer = getLayersArr()[end - 4]
        }
        if (path === 'continent') delete url.query.src
        url.search = `?paths=${url.query.paths}&layer=${url.query.layer}`
        if (url.query.src) url.search += `&src=${url.query.src}`
        return url
    }

    let getHref = getLastHref

    if (paths.includes('layer-priority')) {
        getHref = getHrefWithPaths
        paths = (routes.layerPriority().replace(locale, '') + decodeURIComponent(uriPaths)).split('/')
    }

    return (
        <div className="flex justify-between items-center mb-5">
            <h1 className="font-medium text-2xl capitalize">{cleanWords(paths[paths.length - 1])}</h1>
            <Breadcrumb>
                <BreadcrumbList className="!gap-1">
                    {
                        paths.map((path: any, index: any) => {
                            if (path) {
                                return (
                                    <React.Fragment key={path}>
                                        <BreadcrumbItem>
                                            {
                                                path === noRoute ?
                                                    <span className="text-base">{cleanWords(path)}</span>
                                                    :
                                                    <BreadcrumbLink asChild><Link className={`text-base  ${isCurrentPath(path) ? 'text-c-primary hover:!text-c-primary' : 'hover:!text-c-primary hover:underline'}`} to={getHref(index, path)}>{cleanWords(path)}</Link></BreadcrumbLink>
                                            }
                                        </BreadcrumbItem>
                                        {
                                            index !== paths.length - 1 && (<BreadcrumbSeparator>
                                                <HiSlash className="!w-6 !h-6" />
                                            </BreadcrumbSeparator>)
                                        }
                                    </React.Fragment>
                                )
                            }
                        })
                    }
                </BreadcrumbList>
            </Breadcrumb >

        </div >
    )
}

export default PageHeader