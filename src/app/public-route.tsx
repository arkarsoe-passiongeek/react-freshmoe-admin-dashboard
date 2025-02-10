import { paths } from '@/config/paths';
import useAuth from '@/state/use-auth-store';
import { Navigate, Outlet } from 'react-router';

const PublicRoute = () => {
   const { user } = useAuth();

   if (user) {
      return <Navigate to={paths.root.path} replace />;
   }

   return <Outlet />;
};

export default PublicRoute;
