import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from '@/components/ui/drawer';
import { X } from 'lucide-react';
import React, { ReactNode } from 'react';

// Props interface for the BaseDrawer component
interface BaseDrawerProps {
   children: ReactNode; // The content inside the drawer
   open: boolean; // Whether the drawer is open or not
   setOpen: (open: boolean) => void; // Function to toggle the drawer state
   footer?: ReactNode;
   title: string; // Title displayed in the drawer
   description: string;
}

const BaseDrawer: React.FC<BaseDrawerProps> = ({
   children,
   open,
   setOpen,
   footer,
   title,
   description,
}) => {
   return (
      <Drawer open={open} onOpenChange={setOpen}>
         <DrawerContent className='min-w-[450px] p-5'>
            <DrawerHeader className='text-left p-0 pb-7'>
               <DrawerClose asChild className='absolute right-4 top-4 cursor-pointer'>
                  <X className='h-4 w-4' />
               </DrawerClose>
               <DrawerTitle>{title}</DrawerTitle>
               <DrawerDescription className='hidden'>
                  {description}
               </DrawerDescription>
            </DrawerHeader>
            {children}
            {footer && <DrawerFooter className='pt-2'>{footer}</DrawerFooter>}
         </DrawerContent>
      </Drawer>
   );
};

export default BaseDrawer;
