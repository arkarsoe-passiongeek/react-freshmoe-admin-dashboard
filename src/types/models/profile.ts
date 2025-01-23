import { Role } from './role';

export interface User {
   id: number;
   username: string;
   email: string;
   phone: string | null; // Nullable string
   emailVerifiedAt: string | null; // Nullable ISO 8601 timestamp
   rememberToken: string | null; // Nullable string
   createdAt: string; // ISO 8601 timestamp
   updatedAt: string; // ISO 8601 timestamp
   role: Role;
}
