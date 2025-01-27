export interface Content {
   id: number;
   title: string;
   description: string;
   img_url: string;
   page: string;
   section: number;
   createdAt: string; // ISO date string
   updatedAt: string; // ISO date string
}

export interface DeleteContent {
   id: number | null;
}
