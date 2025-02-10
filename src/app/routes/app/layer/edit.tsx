import CCard from '@/components/ui-custom/c-card';
import { paths } from '@/config/paths';
import LayerUpdateForm from '@/features/layer/components/update-layer';
import { useNavigate, useParams } from 'react-router';

const LayerEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   if (!id) {
      navigate(paths.notFound.path);
      return null;
   }

   return (
      <div>
         <CCard className='bg-c-white border p-10 rounded-md max-w-3xl'>
            <LayerUpdateForm layerId={id} />
         </CCard>
      </div>
   );
};

export default LayerEdit;
