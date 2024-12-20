import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import AuthLayout from './components/layout/auth-layout.tsx';
import DashboardLayout from './components/layout/dashboard-layout.tsx';
import Dashboard from './features/dashboard/dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='unauthorized' element={<Dashboard />} />
        </Route>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
