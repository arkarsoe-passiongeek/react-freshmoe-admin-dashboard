import React, { ReactNode } from 'react';
import BaseDrawer from './base-drawer';

// Props interface for the CreateDrawer component
interface CreateDrawerProps {
   children: ReactNode; // The content inside the drawer
   open: boolean; // Whether the drawer is open or not
   setOpen: (open: boolean) => void; // Function to toggle the drawer state
   footer?: ReactNode;
   title: string; // Title displayed in the drawer
   description: string;
}

const CreateDrawer: React.FC<CreateDrawerProps> = props => {
   return <BaseDrawer {...props} />;
};

export default CreateDrawer;
