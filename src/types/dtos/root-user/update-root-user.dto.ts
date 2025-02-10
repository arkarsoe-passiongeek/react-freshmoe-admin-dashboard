import { Exclude, Type } from 'class-transformer';

export class UpdateRootUser {
   name: string;
   email: string;
   @Type(() => Number)
   roleId: number; // Role ID for creation
   @Exclude()
   consent: boolean;
}
