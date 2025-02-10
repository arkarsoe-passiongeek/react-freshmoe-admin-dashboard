import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

export default function LinkTransition({
   children,
   path,
   className,
}: Readonly<{
   children: ReactNode;
   path: string;
   className?: string;
}>) {
   const navigate = useNavigate();

   const handleViewTransition = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
   ) => {
      e.preventDefault();
      if (window && document?.startViewTransition) {
         document.startViewTransition(() => navigate(path));
      } else {
         navigate(path);
      }
   };

   return (
      <a
         aria-label='link'
         onClick={handleViewTransition}
         href={path}
         className={cn(className)}>
         {children}
      </a>
   );
}
