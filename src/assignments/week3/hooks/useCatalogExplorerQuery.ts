import { useQuery } from "@tanstack/react-query";

type Params = {
  page: number;
  search: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type Response = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
};

export const useCatalogExplorerQuery = ({ page, search }: Params) => {
  return useQuery<Response>({
    queryKey: ["products", { page, search }],

    queryFn: async () => {
      const res = await fetch(
        `/api/products?page=${page}&limit=10&search=${search}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      return res.json();
    },

    placeholderData: (prev) => prev,
  });
};