import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/product";

type CreateProductInput = {
  name: string;
  price: number;
  category: string;
};

type ApiError = Error & {
  fieldErrors?: Record<string, string>;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: CreateProductInput) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();

        const error: ApiError = new Error("Create failed");
        error.fieldErrors = errorData.fieldErrors;

        throw error; 
      }

      return res.json() as Promise<Product>;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};