import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/product";

type UpdateInput = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export const useUpdateCatalogItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateInput) => {
      const res = await fetch(`/api/products/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw error;
      }

      return res.json();
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previous = queryClient.getQueryData<Product[]>(["products"]);

      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) =>
          p.id === newData.id ? { ...p, ...newData } : p
        )
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["products"], context.previous);
      }
    },


    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};