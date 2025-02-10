import { Entity } from './base';
import { Layer } from './layer';

export type ServiceArea = Entity<{
   name: string;
   serviceLayerId: number;
   parentId: number | null;
   serviceLayer: Layer;
   endPoint: boolean
}>;
