type SuccessResponse = {
   status: boolean;
   message: string;
   statusCode: number;
};

export type ApiResponse<T> = {
   data: T;
} & SuccessResponse;
