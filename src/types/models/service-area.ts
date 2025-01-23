export interface ServiceArea {
   id: number;
   name: string;
   createdAt: string;
   updatedAt: string;
}

// Type for Create ServiceArea
export interface CreateServiceArea {
   name: string;
}

// Type for Update ServiceArea
export interface UpdateServiceArea {
   name: string;
}

export interface DeleteServiceArea {
   id: number | null;
}
