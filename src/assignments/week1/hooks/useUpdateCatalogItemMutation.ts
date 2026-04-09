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

      if (data.name === "fail") {
        throw new Error("Simulated failure");
      }

      if (!res.ok) {
        throw new Error("Update failed");
      }

      return res.json() as Promise<Product>;
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousData = queryClient.getQueryData<Product[]>(["products"]);

      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) =>
          p.id === newData.id
            ? { ...p, ...newData, isSaving: true }
            : p
        )
      );

      return { previousData };
    },

    onError: (_err, _newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["products"], context.previousData);
      }
    },

    onSuccess: (updated) => {
      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) =>
          p.id === updated.id ? { ...updated, isSaving: false } : p
        )
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};