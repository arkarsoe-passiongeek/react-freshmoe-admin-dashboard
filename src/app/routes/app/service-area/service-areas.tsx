import ServiceAreaTable from '@/features/service-area/components/service-area-table';
import useSearchParams from '@/hooks/use-search-params';

const ServiceAreas = () => {
   const searchParams = useSearchParams();

   return (
      <div>
         <ServiceAreaTable parentId={searchParams.get('parentId') ?? null} />
      </div>
   );
};

export default ServiceAreas;
