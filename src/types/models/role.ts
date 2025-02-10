import { Entity } from "./base";
import { Permission } from "./permission";

export type Role = Entity<{
    name: string;
    permissions: RolePermission[];
}>;

export interface RolePermission {
    permission: Permission
}
