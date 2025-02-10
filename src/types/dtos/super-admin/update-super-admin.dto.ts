import { Exclude } from 'class-transformer';

export class UpdateSuperAdmin {
   name: string;
   email: string;
   @Exclude()
   consent: boolean;
}
