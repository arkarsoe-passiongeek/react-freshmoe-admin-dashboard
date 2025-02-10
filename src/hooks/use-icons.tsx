import { User } from 'lucide-react';
import { PiEyeClosedThin } from 'react-icons/pi';
import { RxEyeOpen } from 'react-icons/rx';

export const useIcons = () => {
   const getEyeCloseIcon = () => {
      return <PiEyeClosedThin className='text-primary' size={20} />;
   };

   const getEyeOpenIcon = () => {
      return <RxEyeOpen className='text-primary' size={20} />;
   };

   const getMailIcon = () => {
      return <User />;
   };

   return {
      getEyeCloseIcon,
      getEyeOpenIcon,
      getMailIcon,
   };
};
