import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '../pagination';

interface DataPaginationProps {
   totalItems: number;
   itemsPerPage: number;
   onPageChange: (page: number) => void;
   canPrevious: number;
   canNext: number;
}

export const DataPagination = ({
   totalItems,
   itemsPerPage,
   onPageChange,
   canPrevious,
   canNext,
}: DataPaginationProps) => {
   const [currentPage, setCurrentPage] = useState(1);
   const totalPages = Math.ceil(totalItems / itemsPerPage);
   const visiblePages = 2; // Pages shown before & after current

   const handlePageClick = (page: number) => {
      if (page >= 1 && page <= totalPages) {
         setCurrentPage(page);
         onPageChange(page);
      }
   };

   const getPagination = () => {
      let pages = [];
      let start = Math.max(2, currentPage - visiblePages);
      let end = Math.min(totalPages - 1, currentPage + visiblePages);

      pages.push(1); // Always show first page

      if (start > 2) pages.push('...'); // Ellipsis before middle pages

      for (let i = start; i <= end; i++) {
         pages.push(i);
      }

      if (end < totalPages - 1) pages.push('...'); // Ellipsis after middle pages

      if (totalPages > 1) pages.push(totalPages); // Always show last page

      return pages;
   };

   return (
      <div className='flex gap-2 justify-center mt-6'>
         <Pagination>
            <PaginationContent className='space-x-3'>
               <PaginationItem>
                  <PaginationPrevious
                     onClick={() => handlePageClick(currentPage - 1)}
                     className={cn(
                        !canPrevious ? 'opacity-50 pointer-events-none' : '',
                        'border-0',
                     )}
                  />
               </PaginationItem>

               {getPagination().map((page, index) =>
                  page === '...' ? (
                     <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                     </PaginationItem>
                  ) : (
                     <PaginationItem key={`page-${page}`}>
                        <PaginationLink
                           href='#'
                           onClick={e => {
                              e.preventDefault();
                              onPageChange(page as number);
                           }}
                           isActive={currentPage === page}
                           className={
                              currentPage === page
                                 ? 'border-primary'
                                 : 'border-0'
                           }>
                           {page}
                        </PaginationLink>
                     </PaginationItem>
                  ),
               )}

               <PaginationItem>
                  <PaginationNext
                     href='#'
                     onClick={() => handlePageClick(currentPage + 1)}
                     className={cn(
                        !canNext ? 'opacity-50 pointer-events-none' : '',
                        'border-0',
                     )}
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </div>
   );
};
