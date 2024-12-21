import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import AuthLayout from './components/layout/auth-layout.tsx';
import DashboardLayout from './components/layout/dashboard-layout.tsx';
import Dashboard from './features/dashboard/dashboard.tsx';
import LanguageHandler from './components/layout/language-handler.tsx';
import NotFound from './components/layout/not-found.tsx';
import MaintenancePage from './features/maintenance/maintenance-page.tsx';
import LayerPage from './features/service-parameter/layer/layer-page.tsx';
import PriorityPage from './features/service-parameter/priority/priority-page.tsx';
import LayerPriorityPage from './features/service-parameter/layer-priority/layer-priority-page.tsx';
import HomePage from './features/content-and-image/home.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LayerCreatePage from './features/service-parameter/layer/layer-create-page.tsx';
import LayerEditPage from './features/service-parameter/layer/layer-edit-page.tsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={`:lang`} element={<LanguageHandler />}>
            <Route path="auth" element={<AuthLayout />}>
              <Route path='unauthorized' element={<Dashboard />} />
            </Route>
            <Route path="" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='maintenance' element={<MaintenancePage />} />
              <Route path='service-parameter/layer' element={<LayerPage />} />
              <Route path='service-parameter/layer/create-layer' element={<LayerCreatePage />} />
              <Route path='service-parameter/layer/:id/edit-layer' element={<LayerEditPage />} />
              <Route path='service-parameter/layer-priority' element={<LayerPriorityPage />} />
              <Route path='service-parameter/priority' element={<PriorityPage />} />
              <Route path='content-image/home' element={<HomePage />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode >,
)
