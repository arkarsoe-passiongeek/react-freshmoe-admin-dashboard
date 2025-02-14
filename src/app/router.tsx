import { paths } from '@/config/paths';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthRoute from './auth-route';
import ErrorBoundary from './error-boundary';
import PublicRoute from './public-route';
import LayerCreate from './routes/app/layer/create';
import LayerEdit from './routes/app/layer/edit';
import LayerView from './routes/app/layer/layer';
import LayersPage from './routes/app/layer/layers';
import ServiceAreaCreatePage from './routes/app/service-area/create';
import ServiceAreaEditPage from './routes/app/service-area/edit';
import ServiceAreas from './routes/app/service-area/service-areas';
import ServiceTypeCreate from './routes/app/service-type/create';
import ServiceTypeEdit from './routes/app/service-type/edit';
import ServiceTypeView from './routes/app/service-type/service-type';
import ServiceTypesPage from './routes/app/service-type/service-types';
import NotAuthorized from './routes/auth/not-authorized';

/**
 * Lazily loads components to optimize the initial load time.
 * Components will be loaded only when needed. 😴
 */
const Dashboard = lazy(() => import('@/app/routes/app/dashboard'));
const NotFound = lazy(() => import('@/app/routes/app/not-found'));

export const router = createBrowserRouter([
   {
      element: <PublicRoute />,
      children: [
         {
            path: paths.notAuthorized.path,
            element: <NotAuthorized />,
         },
      ],
   },
   {
      element: <AuthRoute />,
      ErrorBoundary: ErrorBoundary,
      children: [
         {
            path: paths.root.path,
            element: <Dashboard />,
         },
         {
            path: paths.layer.path,
            children: [
               {
                  index: true,
                  element: <LayersPage />,
               },
               {
                  path: 'create',
                  element: <LayerCreate />,
               },
               {
                  path: ':id/edit',
                  element: <LayerEdit />,
               },
               {
                  path: ':id/view',
                  element: <LayerView />,
               },
            ],
         },
         {
            path: paths.serviceType.path,
            children: [
               {
                  index: true,
                  element: <ServiceTypesPage />,
               },
               {
                  path: 'create',
                  element: <ServiceTypeCreate />,
               },
               {
                  path: ':id/edit',
                  element: <ServiceTypeEdit />,
               },
               {
                  path: ':id/view',
                  element: <ServiceTypeView />,
               },
            ],
         },
         {
            path: paths.serviceArea.path,
            children: [
               {
                  index: true,
                  element: <ServiceAreas />,
               },
               {
                  path: 'create',
                  element: <ServiceAreaCreatePage />,
               },
               {
                  path: ':id/edit',
                  element: <ServiceAreaEditPage />,
               },
            ],
         },
         {
            path: '*',
            element: <NotFound />,
         },
      ],
   },
]);

export default function AppRouter() {
   return <RouterProvider router={router} />;
}
