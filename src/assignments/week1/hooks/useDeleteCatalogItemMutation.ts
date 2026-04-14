import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/product";

export const useDeleteCatalogItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      return id;
    },

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const queries = queryClient.getQueriesData<Product[]>({
        queryKey: ["products"],
      });

      const previous = queries;

      queries.forEach(([key, data]) => {
        queryClient.setQueryData<Product[]>(key, (old = []) =>
          old.filter((p) => p.id !== id)
        );
      });

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        context.previous.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false, 
      });
    },
  });
};