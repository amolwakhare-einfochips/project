type ProductParams = {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export const queryKeys = {
  products: (params?: ProductParams) => [
    "products",
    params?.search ?? "",
    params?.category ?? "",
    params?.sort ?? "",
    params?.page ?? 1,
    params?.limit ?? 10,
  ],
};