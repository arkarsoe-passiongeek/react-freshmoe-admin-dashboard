import Link from '@/components/common/link';
import {
   Breadcrumb,
   BreadcrumbEllipsis,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getPageHeader } from '@/config/get-page-header';
import { paths } from '@/config/paths';
import useSearchParams from '@/hooks/use-search-params';
import { api } from '@/lib/api-client';
import { ServiceArea } from '@/types';
import React, { useEffect, useState } from 'react';
import { HiSlash } from 'react-icons/hi2';
import { useLocation, useParams } from 'react-router';
import Loading from '../loading';

const PageHeader = () => {
   const routeParams = useParams();
   const location = useLocation();
   const searchParam = useSearchParams();
   const [newRoutes, setNewRoutes] = useState([]);
   const [loading, setLoading] = useState(false);

   const pathname = location.pathname.replace(
      routeParams.id ? `${routeParams.id ?? ''}` : '',
      '',
   );

   const takeSrc = (obj, arr) => {
      if (obj.parent) {
         takeSrc(obj.parent, arr); // Recursively process the parent
      }
      arr.push(obj); // Push the current object after processing its parent
   };

   async function fetchServiceAreaBreadcrumbs(
      payload: { id: string }
   ): Promise<ServiceArea[]> {
      return (
         await api.get(
            `service-areas/${payload.id}/breadcrumbs`
         )
      )?.data;
   }

   const pageHeaderData = getPageHeader(pathname);

   const isServiceArea = () => {
      return (
         pathname === paths.serviceArea.path ||
         pathname === paths.serviceArea.create.path ||
         pathname === paths.serviceArea.edit.getHref('')
      );
   };

   useEffect(() => {
      if (isServiceArea()) {
         if (!searchParam.has('parentId') || searchParam.get('parentId') == 'null') {
            setNewRoutes(pageHeaderData.links);
         } else {
            setLoading(true);
            fetchServiceAreaBreadcrumbs({
               id: routeParams.id ?? searchParam.get('parentId'),
            })
               .then(res => {
                  console.log(res);
                  if (res) {
                     const newRes = [];
                     takeSrc(res, newRes);
                     const newData = newRes.map((each, index) => {
                        const newObj = {};
                        newObj.value = each.name;
                        newObj.current = index === newRes.length - 1;
                        if (each.parentId || each.parentId === null) {
                           newObj.path = () =>
                              paths
                                 .serviceArea.path + `?parentId=${each.id}`;
                        } else {
                           newObj.path = () =>
                              paths.serviceArea.path;
                        }

                        return newObj;
                     });
                     if (
                        pathname ===
                        paths.serviceArea.create.path ||
                        pathname ===
                        paths.serviceArea.edit.getHref('')
                     ) {
                        newData.push({
                           ...pageHeaderData.links[
                           pageHeaderData.links.length - 1
                           ],
                        });
                        setNewRoutes([
                           ...pageHeaderData.links.slice(
                              0,
                              pageHeaderData.links.length - 1
                           ),
                           ...newData,
                        ]);
                     } else {
                        setNewRoutes([...pageHeaderData.links, ...newData]);
                     }
                     console.log(newRoutes);
                  }
               })
               .catch(err => {
                  setNewRoutes(pageHeaderData.links);
               })
               .finally(() => {
                  setLoading(false);
               });
         }
      } else {
         setNewRoutes(pageHeaderData.links);
      }
      console.log(newRoutes);
   }, [location]);

   return (
      <div className='flex justify-between items-center mb-5'>
         <h1 className='font-medium text-2xl capitalize'>
            {!isServiceArea()
               ? pageHeaderData.header
               : newRoutes[newRoutes.length - 1]?.value}
         </h1>
         {loading && <Loading />}
         {
            !loading && (
               <Breadcrumb>
                  <BreadcrumbList className='!gap-1'>
                     {pageHeaderData.links
                        ? newRoutes.slice(0, 3).map((link, index) => {
                           return (
                              <React.Fragment key={index}>
                                 <BreadcrumbItem>
                                    {!link.path ? (
                                       <span
                                          className={`text-base text-c-contrast  ${link.current ? 'text-primary' : ''
                                             }`}>
                                          {typeof link.value === 'function'
                                             ? link.value(routeParams.id)
                                             : link.value}
                                       </span>
                                    ) : (
                                       <BreadcrumbLink asChild>
                                          <Link
                                             className={`text-base text-c-contrast ${link.current
                                                ? '!text-primary hover:!text-primary'
                                                : 'hover:!text-primary hover:underline'
                                                }`}
                                             to={link.path(String(routeParams.id))}>
                                             {typeof link.value === 'function'
                                                ? link.value(String(routeParams.id))
                                                : link.value}
                                          </Link>
                                       </BreadcrumbLink>
                                    )}
                                 </BreadcrumbItem>
                                 {index !== newRoutes.length - 1 && (
                                    <BreadcrumbSeparator>
                                       <HiSlash className='!w-6 !h-6' />
                                    </BreadcrumbSeparator>
                                 )}
                              </React.Fragment>
                           );
                        })
                        : ''}
                     {pageHeaderData.links && newRoutes.length > 4 && (
                        <BreadcrumbItem>
                           <DropdownMenu>
                              <DropdownMenuTrigger className='flex items-center gap-1'>
                                 <BreadcrumbEllipsis className='h-4 w-4' />
                                 <span className='sr-only'>Toggle menu</span>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                 {newRoutes.slice(3).map((link, index) => {
                                    console.log(newRoutes);
                                    if (index !== newRoutes.slice(3).length - 1) {
                                       return (
                                          <DropdownMenuItem key={link.value}>
                                             {!link.path && (
                                                <span
                                                   className={`text-base text-c-contrast  ${link.current
                                                      ? 'text-primary'
                                                      : ''
                                                      }`}>
                                                   {typeof link.value ===
                                                      'function'
                                                      ? link.value(routeParams.id)
                                                      : link.value}
                                                </span>
                                             )}
                                             {link.path && (
                                                <Link
                                                   className={`text-base text-c-contrast w-full ${link.current
                                                      ? '!text-primary hover:!text-primary'
                                                      : 'hover:!text-primary hover:underline'
                                                      }`}
                                                   to={
                                                      link.path(routeParams.id)
                                                   }>
                                                   {typeof link.value ===
                                                      'function'
                                                      ? link.value(routeParams.id)
                                                      : link.value}
                                                </Link>
                                             )}
                                          </DropdownMenuItem>
                                       );
                                    }
                                 })}
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </BreadcrumbItem>
                     )}
                     {pageHeaderData.links && newRoutes.length > 3 && (
                        <>
                           {newRoutes.length !== 4 && (
                              <BreadcrumbSeparator>
                                 <HiSlash className='!w-6 !h-6' />
                              </BreadcrumbSeparator>
                           )}
                           <BreadcrumbItem>
                              <span
                                 className={`text-base text-c-contrast  ${newRoutes[newRoutes.length - 1].current
                                    ? 'text-primary'
                                    : ''
                                    }`}>
                                 {typeof newRoutes[newRoutes.length - 1].value ===
                                    'function'
                                    ? newRoutes[newRoutes.length - 1].value(
                                       routeParams.id
                                    )
                                    : newRoutes[newRoutes.length - 1].value}
                              </span>
                           </BreadcrumbItem>
                        </>
                     )}
                  </BreadcrumbList>
               </Breadcrumb>
            )
         }
      </div>
   );
};

export default PageHeader;
