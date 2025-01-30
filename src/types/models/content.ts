export interface Content {
   id: number;
   title: string;
   description: string;
   imgUrl: string;
   page: string;
   section: number;
   createdAt: string; // ISO date string
   updatedAt: string; // ISO date string
}

export interface DeleteContent {
   id: number | null;
}

export interface CreateContent {
   title: string; // Title of the content
   description: string; // Description of the content
   page: string; // Page where the content belongs
   section: string; // Section of the page
   image: File; // Binary image file
}

export interface UpdateContent {
   title: string; // Title of the content
   description: string; // Description of the content
   page: string; // Page where the content belongs
   section: string; // Section of the page
   image: File; // Binary image file
}
