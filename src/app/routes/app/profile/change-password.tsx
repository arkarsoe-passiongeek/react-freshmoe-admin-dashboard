import CCard from '@/components/ui-custom/c-card';
import { ChangePasswordForm } from '@/features/profile/components/change-password';

const ChangePasswordPage = () => {
   return (
      <div>
         <CCard className='bg-c-white border p-10 rounded-md max-w-3xl'>
            <ChangePasswordForm />
         </CCard>
      </div>
   );
};

export default ChangePasswordPage;
