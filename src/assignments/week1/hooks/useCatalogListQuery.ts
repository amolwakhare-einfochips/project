import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../shared/ui/api/products";

export const useCatalogListQuery = () => {
  const query = useQuery({
    queryKey: ["catalog"],
    queryFn: getProducts,
    retry: false, //  testing error state
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};