import { ErrorFallBack } from '@/components/error-fallback/error-fallback';
import { Skeleton } from '@/components/ui/skeleton';
import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

interface IProviderProps {
   children: React.ReactNode;
}

export default function AppProvider({ children }: Readonly<IProviderProps>) {
   /**
    * `queryClient` instance is stored in the component's state and will persist across re-renders.
    * This approach avoids creating a new QueryClient instance on every render,
    * which would be inefficient and could lead to unexpected behavior. 💁‍♂️
    */
   const [queryClient] = React.useState(
      () =>
         new QueryClient({
            defaultOptions: queryConfig,
         }),
   );

   return (
      <React.Suspense
         fallback={
            <div className='flex h-screen w-screen items-center justify-center'>
               <div className='flex flex-col space-y-3'>
                  <Skeleton className='h-[125px] w-[250px] rounded-xl' />
                  <div className='space-y-2'>
                     <Skeleton className='h-4 w-[250px]' />
                     <Skeleton className='h-4 w-[200px]' />
                  </div>
               </div>
            </div>
         }>
         <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <HelmetProvider>
               <QueryClientProvider client={queryClient}>
                  <Toaster toastOptions={{
                     unstyled: false,
                     classNames: {
                        error: 'bg-destructive',
                        success: 'text-success',
                        warning: 'text-warning',
                        info: 'bg-info',
                     }
                  }} />
                  {children}
               </QueryClientProvider>
            </HelmetProvider>
         </ErrorBoundary>
      </React.Suspense>
   );
}
