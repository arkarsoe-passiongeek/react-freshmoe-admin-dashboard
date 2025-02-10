import { Entity } from "./base";

export type Layer = Entity<{
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}>

export type ReorderLayer = {
  orderIndex: string;
}
