import { Exclude } from 'class-transformer';

export class CreateLayer {
   name: string;
   @Exclude()
   consent: boolean;
}
