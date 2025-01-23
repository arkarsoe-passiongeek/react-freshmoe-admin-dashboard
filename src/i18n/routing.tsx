import { cn } from '@/lib/utils';
import { Link as RouterLink } from 'react-router';

const createNavigation = () => {
   const Link = ({ children, className, ...rest }: any) => {
      return (
         <RouterLink
            className={cn(className, '!border-0 px-0 py-0 text-c-black hover:text-c-primary')}
            {...rest}>
            {children}
         </RouterLink>
      );
   };

   return { Link };
};

export const { Link } = createNavigation();
