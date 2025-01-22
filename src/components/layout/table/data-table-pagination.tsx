import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { ROWS_PER_PAGE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
   table: Table<TData>;
}

export function DataTablePagination<TData>({
   table,
}: Readonly<DataTablePaginationProps<TData>>) {
   const currentPage = table.getState().pagination.pageIndex + 1;
   const pageCount = table.getPageCount();
   const pageSize = table.getState().pagination.pageSize;

   return (
      <div className='flex items-center justify-between px-2'>
         <div className='flex items-center justify-between w-full space-x-6 lg:space-x-8'>
            {/* Rows per page selection */}
            <div className='flex items-center space-x-2'>
               <p className='text-sm font-medium'>Rows per page</p>
               <Select
                  value={`${pageSize}`}
                  onValueChange={(value: any) => {
                     table.setPageSize(Number(value));
                  }}>
                  <SelectTrigger className='h-auto bg-c-white w-[70px]'>
                     <SelectValue placeholder={pageSize.toString()} />
                  </SelectTrigger>
                  <SelectContent side='top'>
                     {ROWS_PER_PAGE.map(size => (
                        <SelectItem key={size} value={`${size}`}>
                           {size}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            {/* Page information */}
            <div className='flex space-x-2'>
               {/* <div className="flex items-center justify-center text-sm font-medium">
             Page {currentPage} of {pageCount}
           </div> */}

               {/* Pagination buttons */}
               <div className='flex items-center space-x-2'>
                  <Pagination>
                     <PaginationContent className='space-x-3'>
                        <PaginationItem>
                           <PaginationPrevious
                              href='#'
                              onClick={e => {
                                 e.preventDefault();
                                 table.previousPage();
                              }}
                              className={cn(
                                 !table.getCanPreviousPage()
                                    ? 'opacity-50 pointer-events-none'
                                    : '',
                                 'border-0'
                              )}
                           />
                        </PaginationItem>

                        {/* Display page numbers */}
                        {Array.from({ length: pageCount }, (_, index) => (
                           <PaginationItem key={index}>
                              <PaginationLink
                                 href='#'
                                 onClick={e => {
                                    e.preventDefault();
                                    table.setPageIndex(index);
                                 }}
                                 isActive={currentPage === index + 1}
                                 className={
                                    currentPage === index + 1
                                       ? 'border-primary'
                                       : 'border-0'
                                 }>
                                 {index + 1}
                              </PaginationLink>
                           </PaginationItem>
                        ))}

                        {/* Ellipsis for pages not shown */}
                        {/* {pageCount > 5 && (
                   <PaginationItem>
                     <PaginationEllipsis />
                   </PaginationItem>
                 )} */}
                        <PaginationItem>
                           <PaginationNext
                              href='#'
                              onClick={e => {
                                 e.preventDefault();
                                 table.nextPage();
                              }}
                              className={cn(
                                 !table.getCanNextPage()
                                    ? 'opacity-50 pointer-events-none'
                                    : '',
                                 'border-0'
                              )}
                           />
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               </div>
            </div>
         </div>
      </div>
   );
}
