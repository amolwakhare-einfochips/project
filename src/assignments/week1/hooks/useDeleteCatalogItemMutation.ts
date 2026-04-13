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

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previous = queryClient.getQueryData<Product[]>(["products"]);

      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.filter((p) => p.id !== id)
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["products"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};