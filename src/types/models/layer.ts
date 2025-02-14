import { Entity } from './base';

export type Layer = Entity<{
   name: string;
   orderIndex: number;
}>;

export type ReorderLayer = {
   orderIndex: string;
};
