import { Entity } from './base';
import { Layer } from './layer';

export type ServiceArea = Entity<{
   name: string;
   serviceLayerId: number;
   parentId: number | null;
   serviceLayer: Layer;
   endPoint: boolean;
   b2bEndPoint: boolean;
   b2bServiceStatus: boolean;
}>;
