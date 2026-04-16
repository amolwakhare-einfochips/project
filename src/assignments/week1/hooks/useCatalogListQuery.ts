import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/ui/api/queryKeys";

type Params = {
  search?: string;
  category?: string;
  sort?: "asc" | "desc";
};

export const useCatalogListQuery = (params: Params) => {
  return useQuery({
   queryKey: queryKeys.products(params),

    queryFn: async () => {
      const query = new URLSearchParams();

      if (params.search) query.append("search", params.search);
      if (params.category && params.category !== "all") {
        query.append("category", params.category);
      }
      if (params.sort) query.append("sort", params.sort);

      const res = await fetch(`/api/products?${query.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },

    retry: false,
    refetchOnWindowFocus: false,
  });
};