import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/product";

type CreateProductInput = {
  name: string;
  price: number;
  category: string;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: CreateProductInput) => {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to create product");

      return res.json() as Promise<Product>;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};