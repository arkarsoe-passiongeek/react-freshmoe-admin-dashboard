import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthLayout from './components/layout/auth-layout.tsx';
import DashboardLayout from './components/layout/dashboard-layout.tsx';
import LanguageHandler from './components/layout/language-handler.tsx';
import NotFound from './components/layout/not-found.tsx';
import Unauthorized from './features/auth/unauthorized.tsx';
import HomePage from './features/content-and-image/home.tsx';
import Dashboard from './features/dashboard/dashboard.tsx';
import MaintenancePage from './features/maintenance/maintenance-page.tsx';
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
                     <Route path='maintenance' element={<MaintenancePage />} />
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
                     {/*
              <Route
                path="service-parameter/layer-priority"
                element={<LayerPriorityPage />}
              />
              <Route
                path="service-parameter/layer-priority/create-layer-priority"
                element={<LayerPriorityCreatePage />}
              />
              <Route
                path="service-parameter/layer-priority/:id/edit-layer-priority"
                element={<LayerPriorityEditPage />}
              />
              <Route
                path="service-parameter/layer-priority"
                element={<LayerPriorityPage />}
              />
              <Route
                path="service-parameter/priority"
                element={<PriorityPage />}
              />
              <Route
                path="service-parameter/priority/create-priority"
                element={<PriorityCreatePage />}
              />
              <Route
                path="service-parameter/priority/:id/edit-priority"
                element={<PriorityEditPage />}
              /> */}
                     <Route path='content-image/home' element={<HomePage />} />
                  </Route>
                  <Route path='*' element={<NotFound />} />
               </Route>
            </Routes>
         </QueryClientProvider>
      </BrowserRouter>
   </StrictMode>
);
