import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import usePathname from '@/hooks/use-pathname';
import { Link } from '@/i18n/routing';
import { getPageHeader } from '@/lib/data';
import React from 'react';
import { HiSlash } from 'react-icons/hi2';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';

const PageHeader = () => {
   const routeParams = useParams();
   const { locale } = useIntl();
   let pathname = usePathname();

   pathname = pathname.replace(
      routeParams.id ? `/${routeParams.id ?? ''}` : '',
      ''
   );

   const pageHeaderData = getPageHeader(pathname);

   return (
      <div className='flex justify-between items-center mb-5'>
         <h1 className='font-medium text-2xl capitalize'>
            {pageHeaderData.header}
         </h1>
         <Breadcrumb>
            <BreadcrumbList className='!gap-1'>
               {pageHeaderData.links
                  ? pageHeaderData.links.map((link, index) => {
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
                             {index !== pageHeaderData.links.length - 1 && (
                                <BreadcrumbSeparator>
                                   <HiSlash className='!w-6 !h-6' />
                                </BreadcrumbSeparator>
                             )}
                          </React.Fragment>
                       );
                    })
                  : ''}
            </BreadcrumbList>
         </Breadcrumb>
      </div>
   );
};

export default PageHeader;
