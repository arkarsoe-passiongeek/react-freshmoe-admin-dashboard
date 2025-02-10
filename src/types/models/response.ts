export type ApiResponse<T> = {
   data: T;
   status: boolean;
   message: string;
   statusCode: number;
};

export type ListApiResponse<T> = {
   data: T[];
   status: boolean;
   message: string;
   statusCode: number;
};
