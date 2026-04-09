import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCatalogItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            return true;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};