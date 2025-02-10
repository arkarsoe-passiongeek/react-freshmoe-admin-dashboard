export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type BaseEntity = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

