// Interface for Priority object
export interface Priority {
  id: number;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Interface for Create Priority payload
export interface CreatePriority {
  name: string;
}

// Interface for Update Priority payload
export interface UpdatePriority {
  name: string;
}
