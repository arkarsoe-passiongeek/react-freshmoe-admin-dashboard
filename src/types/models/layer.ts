export interface Layer {
   id: number;
   name: string;
   createdAt: string;
   updatedAt: string;
}

// Type for Create Layer
export interface CreateLayer {
   name: string;
}

// Type for Update Layer
export interface UpdateLayer {
   name: string;
}

// Type for Reorder Layer
export interface ReorderLayer {
   orderIndex: string;
}

export interface DeleteLayer {
   id: number | null;
}
