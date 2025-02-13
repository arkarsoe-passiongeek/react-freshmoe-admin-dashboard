import { Entity } from './base';

export type Layer = Entity<{
   name: string;
}>;

export type ReorderLayer = {
   orderIndex: string;
};
