import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/ui/api/queryKeys";

type Params = {
  page: number;
  search: string;
  limit: number;
  category?: string;
  sort?: "asc" | "desc";
};

export const useCatalogExplorerQuery = (params: Params) => {
  return useQuery({
    queryKey: [
      "products",
      params.page,
      params.limit,
      params.search,
      params.category,
      params.sort,
    ],

    queryFn: async () => {
      const query = new URLSearchParams();

      if (params.search) {
        query.append("search", params.search);
      }

      if (params.category && params.category !== "all") {
        query.append("category", params.category);
      }

      if (params.sort) {
        query.append("sort", params.sort);
      }

      query.append("page", String(params.page));

      query.append("limit", String(params.limit));

      const res = await fetch(`/api/products?${query.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      return res.json();
    },

    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};