import {
   Breadcrumb,
   BreadcrumbEllipsis,
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
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Loading from './loading';

const PageHeader = () => {
   const routeParams = useParams();
   const { locale } = useIntl();
   let pathname = usePathname();
   const routes = useLinkRoutes();
   const location = useLocation();
   const [newRoutes, setNewRoutes] = useState([]);
   const searchParam = useSearchParams();
   const [loading, setLoading] = useState(false);

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

   const isServiceArea = () => {
      return (
         pathname === routes.serviceArea().replace(`/${locale}`, '') ||
         pathname === routes.serviceAreaCreate().replace(`/${locale}`, '') ||
         pathname === routes.serviceAreaEdit().replace(`/${locale}`, '')
      );
   };

   useEffect(() => {
      if (isServiceArea()) {
         if (
            !searchParam.has('parentId') ||
            searchParam.get('parentId') == 'null'
         ) {
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
                     console.log(newRes, 'this is ');
                     const newData = newRes.map((each, index) => {
                        const newObj = {};
                        newObj.value = each.name;
                        newObj.current = index === newRes.length - 1;
                        if (each.parentId || each.parentId === null) {
                           newObj.path = () =>
                              routes
                                 .serviceArea({
                                    search: `?parentId=${each.id}`,
                                 })
                                 .replace(`${locale}/`, '');
                        } else {
                           newObj.path = () =>
                              routes.serviceArea().replace(`${locale}/`, '');
                        }

                        return newObj;
                     });
                     console.log(pathname);
                     if (
                        pathname ===
                           routes
                              .serviceAreaCreate()
                              .replace(`/${locale}`, '') ||
                        pathname ===
                           routes.serviceAreaEdit().replace(`/${locale}`, '')
                     ) {
                        console.log('here');
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
   }, [location]);

   return (
      <div className='flex justify-between items-center mb-5'>
         <h1 className='font-medium text-2xl capitalize'>
            {!isServiceArea()
               ? pageHeaderData.header
               : newRoutes[newRoutes.length - 1]?.value}
         </h1>
         {loading && <Loading />}
         {!loading && (
            <Breadcrumb>
               <BreadcrumbList className='!gap-1'>
                  {pageHeaderData.links
                     ? newRoutes.slice(0, 3).map((link, index) => {
                          return (
                             <React.Fragment key={link.value}>
                                <BreadcrumbItem>
                                   {!link.path ? (
                                      <span
                                         className={`text-base text-c-contrast  ${
                                            link.current ? 'text-primary' : ''
                                         }`}>
                                         {typeof link.value === 'function'
                                            ? link.value(routeParams.id)
                                            : link.value}
                                      </span>
                                   ) : (
                                      <BreadcrumbLink asChild>
                                         <Link
                                            className={`text-base text-c-contrast ${
                                               link.current
                                                  ? '!text-primary hover:!text-primary'
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
                                                className={`text-base text-c-contrast  ${
                                                   link.current
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
                                                className={`text-base text-c-contrast w-full ${
                                                   link.current
                                                      ? '!text-primary hover:!text-primary'
                                                      : 'hover:!text-primary hover:underline'
                                                }`}
                                                to={
                                                   `/${locale}` +
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
                              className={`text-base text-c-contrast  ${
                                 newRoutes[newRoutes.length - 1].current
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
         )}
      </div>
   );
};

export default PageHeader;
