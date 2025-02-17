import InfoItem from '@/components/common/info/item';
import Loading from '@/components/layouts/loading';
import { FaUserCircle } from 'react-icons/fa';
import { useProfile } from '../api/profile';

const ProfilePage = () => {
   const profileQuery = useProfile({});

   const profile = profileQuery.data?.data;

   if (profileQuery.isLoading) return <Loading />;

   if (!profile) return null;

   return (
      <div className='bg-c-white border p-10 rounded-md max-w-3xl'>
         {profile && (
            <div className='space-y-[30px]'>
               <h3 className='text-xl font-semibold'>Profile Information</h3>
               <div className='flex gap-7 items-center'>
                  <FaUserCircle className='w-[150px] h-[150px] fill-primary' />
                  <div className='flex flex-col gap-7'>
                     <InfoItem label='Name' data={profile.name} />
                     <InfoItem label='Email' data={profile.email} />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProfilePage;
