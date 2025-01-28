import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from '@/components/ui/drawer';
import React, { ReactNode } from 'react';

// Props interface for the UpdateDrawer component
interface UpdateDrawerProps {
   children: ReactNode; // The content inside the drawer
   open: boolean; // Whether the drawer is open or not
   setOpen: (open: boolean) => void; // Function to toggle the drawer state
   footer?: ReactNode;
   title: string; // Title displayed in the drawer
   description: string;
}

const UpdateDrawer: React.FC<UpdateDrawerProps> = ({
   children,
   open,
   setOpen,
   footer,
   title,
   description,
}) => {
   return (
      <Drawer open={open} onOpenChange={setOpen}>
         <DrawerContent
            aria-describedby={title ?? 'update'}
            className='min-w-[450px] p-5'>
            <DrawerHeader className='text-left p-0 pb-7'>
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

export default UpdateDrawer;
