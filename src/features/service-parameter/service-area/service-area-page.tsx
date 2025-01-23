import useSearchParams from '@/hooks/use-search-params';
import { useLinkRoutes } from '@/lib/route';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import ServiceAreaTable from './components/service-area-table';

const ServiceAreaPage = () => {
   const searchParam = useSearchParams();
   const routes = useLinkRoutes();
   const navigate = useNavigate();

   useEffect(() => {
      console.log('ehre');
      if (!searchParam.has('parentId')) {
         navigate(routes.serviceArea());
      }
   }, []);

   return (
      <div>
         <ServiceAreaTable />
      </div>
   );
};

export default ServiceAreaPage;
