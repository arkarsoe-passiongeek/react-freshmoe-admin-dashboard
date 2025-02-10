import { RolePermission } from '@/types/models';
import { Exclude } from 'class-transformer';

export class UpdateRole {
   name: string;
   permissionIds: RolePermission[];
   @Exclude()
   consent: boolean;
}
