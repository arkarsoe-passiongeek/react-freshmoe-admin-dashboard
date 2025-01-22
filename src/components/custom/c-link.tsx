import { cn } from '@/lib/utils'; // Utility for merging class names
import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router';

// Variants for Link styles
const linkVariants = cva(
   'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex justify-center items-center font-medium text-c-white capitalize',
   {
      variants: {
         styleType: {
            default: 'hover:bg-c-active-bg hover:text-primary',
            cancel:
               'bg-c-white text-c-black hover:bg-c-hover hover:text-c-white',
            create: 'bg-primary hover:bg-c-hover',
            update: 'bg-primary hover:bg-c-hover',
            success: 'bg-primary hover:bg-c-hover',
            delete: 'bg-secondary hover:bg-c-secondary-hover',
         },
         size: {
            xs: 'text-xs py-1 px-4 h-8 min-w-[70px] font-light rounded-xl', // Extra small size
            sm: 'text-sm py-2 px-6 h-9 rounded-xl', // Small size
            md: 'text-base py-3 px-10 h-12 rounded-xl font-light', // Medium size (default)
            lg: 'text-base py-4 px-12 h-16 rounded-xl', // Large size
         },
      },
      defaultVariants: {
         styleType: 'default', // Default style
         size: 'md', // Default size (medium)
      },
   }
);

interface CLinkProps extends LinkProps {
   children: React.ReactNode;
   className?: string;
   styleType?:
      | 'default'
      | 'cancel'
      | 'create'
      | 'update'
      | 'success'
      | 'delete';
   size?: 'xs' | 'sm' | 'md' | 'lg'; // Size variants
}

const CLink = forwardRef<HTMLAnchorElement, CLinkProps>(
   (
      { children, className, styleType = 'default', size = 'md', ...rest },
      ref
   ) => {
      return (
         <Link
            ref={ref} // Forward ref to the Link component
            className={cn(linkVariants({ styleType, size }), className)} // Combine styles
            {...rest} // Spread the rest of the props (from LinkProps)
         >
            {children}
         </Link>
      );
   }
);

CLink.displayName = 'CLink'; // Setting displayName for better debugging in React DevTools

export default CLink;
