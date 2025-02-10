import { Entity } from "./base";
import { Role } from "./role";

// Main RootUser Type
export type RootUser = Entity<{
    name: string;
    email: string;
    phone: string | null;
    emailVerifiedAt: string | null;
    rememberToken: string | null;
    role: Role;
}>;

// CreateRootUser Type: For creating a new user
export type CreateRootUser = {
    name: string;
    email: string;
    phone?: string | null;
    role: number; // Role ID for creation
    password: string; // Include password for creation
}

// UpdateRootUser Type: For updating an existing user
export type UpdateRootUser = {
    name?: string; // Optional for partial updates
    email?: string;
    phone?: string | null;
    role?: number; // Role ID for updating
    password?: string; // Optional password update
}

export type DeleteRootUser = {
    id: number | null;
}
