import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthLayout from './components/layout/auth-layout.tsx';
import DashboardLayout from './components/layout/dashboard-layout.tsx';
import LanguageHandler from './components/layout/language-handler.tsx';
import NotFound from './components/layout/not-found.tsx';
import RedirectPage from './components/layout/redirect-page.tsx';
import Unauthorized from './features/auth/unauthorized.tsx';
import Dashboard from './features/dashboard/dashboard.tsx';
import LayerCreatePage from './features/service-parameter/layer/layer-create-page.tsx';
import LayerEditPage from './features/service-parameter/layer/layer-edit-page.tsx';
import LayerPage from './features/service-parameter/layer/layer-page.tsx';
import ServiceAreaCreatePage from './features/service-parameter/service-area/service-area-create-page.tsx';
import ServiceAreaEditPage from './features/service-parameter/service-area/service-area-edit-page.tsx';
import ServiceAreaPage from './features/service-parameter/service-area/service-area-page.tsx';
import './index.css';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <Routes>
               <Route path={`:lang`} element={<LanguageHandler />}>
                  <Route path='auth' element={<AuthLayout />}>
                     <Route path='unauthorized' element={<Unauthorized />} />
                  </Route>
                  <Route path='' element={<DashboardLayout />}>
                     <Route index element={<Dashboard />} />
                     <Route
                        path='service-parameter/layer'
                        element={<LayerPage />}
                     />
                     <Route
                        path='service-parameter/layer/create-layer'
                        element={<LayerCreatePage />}
                     />
                     <Route
                        path='service-parameter/layer/:id/edit-layer'
                        element={<LayerEditPage />}
                     />
                     <Route
                        path='service-parameter/service-area'
                        element={<ServiceAreaPage />}
                     />
                     <Route
                        path='service-parameter/service-area/create-service-area'
                        element={<ServiceAreaCreatePage />}
                     />
                     <Route
                        path='service-parameter/service-area/:id/edit-service-area'
                        element={<ServiceAreaEditPage />}
                     />
                  </Route>
                  <Route path='*' element={<NotFound />} />
               </Route>
               <Route path='*' element={<RedirectPage />} />
            </Routes>
         </QueryClientProvider>
      </BrowserRouter>
   </StrictMode>
);
