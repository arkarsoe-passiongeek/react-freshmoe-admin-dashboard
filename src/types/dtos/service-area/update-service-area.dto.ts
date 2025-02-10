import { Exclude, Type } from 'class-transformer';

export class UpdateServiceArea {
   name?: string;
   @Type(() => Number)
   serviceLayerId?: number | null;
   @Type(() => Number)
   parentId?: number | null;
   @Exclude()
   consent?: boolean;
}
