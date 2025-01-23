import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import usePathname from '@/hooks/use-pathname';
import useSearchParams from '@/hooks/use-search-params';
import { Link } from '@/i18n/routing';
import { getPageHeader } from '@/lib/data';
import { useLinkRoutes } from '@/lib/route';
import { fetchServiceAreaBreadcrumbs } from '@/services/actions/service-area';
import React, { useEffect, useState } from 'react';
import { HiSlash } from 'react-icons/hi2';
import { useIntl } from 'react-intl';
import { useLocation, useParams } from 'react-router';

const PageHeader = () => {
   const routeParams = useParams();
   const { locale } = useIntl();
   let pathname = usePathname();
   const routes = useLinkRoutes();
   const location = useLocation();
   const [extraRoutes, setExtraRoutes] = useState([]);
   const searchParam = useSearchParams();

   pathname = pathname.replace(
      routeParams.id ? `/${routeParams.id ?? ''}` : '',
      ''
   );

   const pageHeaderData = getPageHeader(pathname);

   const takeSrc = (obj, arr) => {
      if (obj.parent) {
         takeSrc(obj.parent, arr); // Recursively process the parent
      }
      arr.push(obj); // Push the current object after processing its parent
   };

   useEffect(() => {
      console.log(
         'changing',
         pathname === routes.serviceArea().replace(`/${locale}`, '')
      );
      if (pathname === routes.serviceArea().replace(`/${locale}`, '')) {
         if (!searchParam.has('parentId')) {
            setExtraRoutes([]);
         } else {
            fetchServiceAreaBreadcrumbs({
               id: searchParam.get('parentId'),
            }).then(res => {
               console.log(res);
               if (res) {
                  const newRes = [];
                  takeSrc(res, newRes);
                  console.log(newRes, 'this is ');
                  const newData = newRes.map(each => {
                     const newObj = {};
                     newObj.value = each.name;
                     newObj.current = false;
                     if (each.parentId) {
                        newObj.path = () =>
                           routes
                              .serviceArea({
                                 search: `?parentId=${each.parent?.id}`,
                              })
                              .replace(`${locale}/`, '');
                     } else {
                        newObj.path = () =>
                           routes.serviceArea().replace(`${locale}/`, '');
                     }

                     return newObj;
                  });
                  console.log(newData);
                  setExtraRoutes(newData);
                  console.log(extraRoutes);
               }
            });
         }
      } else if (extraRoutes.length > 0) {
         setExtraRoutes([]);
      }
   }, [location]);

   return (
      <div className='flex justify-between items-center mb-5'>
         <h1 className='font-medium text-2xl capitalize'>
            {pageHeaderData.header}
         </h1>
         <Breadcrumb>
            <BreadcrumbList className='!gap-1'>
               {pageHeaderData.links
                  ? [...pageHeaderData.links, ...extraRoutes].map(
                       (link, index) => {
                          return (
                             <React.Fragment key={link.value}>
                                <BreadcrumbItem>
                                   {!link.path ? (
                                      <span
                                         className={`text-base  ${
                                            link.current ? 'text-primary' : ''
                                         }`}>
                                         {typeof link.value === 'function'
                                            ? link.value(routeParams.id)
                                            : link.value}
                                      </span>
                                   ) : (
                                      <BreadcrumbLink asChild>
                                         <Link
                                            className={`text-base  ${
                                               link.current
                                                  ? 'text-primary hover:!text-primary'
                                                  : 'hover:!text-primary hover:underline'
                                            }`}
                                            to={
                                               `/${locale}` +
                                               link.path(routeParams.id)
                                            }>
                                            {typeof link.value === 'function'
                                               ? link.value(routeParams.id)
                                               : link.value}
                                         </Link>
                                      </BreadcrumbLink>
                                   )}
                                </BreadcrumbItem>
                                {index !==
                                   [...pageHeaderData.links, ...extraRoutes]
                                      .length -
                                      1 && (
                                   <BreadcrumbSeparator>
                                      <HiSlash className='!w-6 !h-6' />
                                   </BreadcrumbSeparator>
                                )}
                             </React.Fragment>
                          );
                       }
                    )
                  : ''}
            </BreadcrumbList>
         </Breadcrumb>
      </div>
   );
};

export default PageHeader;
