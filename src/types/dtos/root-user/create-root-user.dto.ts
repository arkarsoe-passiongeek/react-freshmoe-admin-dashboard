import { Type } from "class-transformer";

export class CreateRootUser {
  name: string;
  email: string;
  phone?: string | null;
  @Type(() => Number)
  roleId: number; // Role ID for creation
  password: string; // Include password for creation
};
