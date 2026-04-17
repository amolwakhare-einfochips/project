import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/product";

type UpdateInput = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type ApiError = Error & {
  fieldErrors?: Record<string, string>;
};

export const useUpdateCatalogItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateInput) => {
      const { id, ...payload } = data;

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), 
      });

      if (!res.ok) {
        const errorData = await res.json();

        const error: ApiError = new Error("Update failed");
        error.fieldErrors = errorData.fieldErrors;

        throw error;
      }

      return res.json();
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previous = queryClient.getQueryData<Product[]>(["products"]);

      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) =>
          p.id === newData.id
            ? { ...p, ...newData, isSaving: true }
            : p
        )
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["products"], context.previous);
      }
    },

    onSuccess: () => {
      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) => ({ ...p, isSaving: false }))
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};