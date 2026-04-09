import { useForm } from "react-hook-form";
import { useUpdateCatalogItemMutation } from "../hooks/useUpdateCatalogItemMutation";
import type { Product } from "../types/product";

type Props = {
    product: Product;
    onClose: () => void;
};

const EditProductModal = ({ product, onClose }: Props) => {
    const { register, handleSubmit } = useForm({
        defaultValues: product,
    });

    const { mutate, isPending } = useUpdateCatalogItemMutation();

    const onSubmit = (data: Product) => {
        mutate(
            {
                id: product.id,
                name: data.name,
                price: Number(data.price), 
                category: data.category || "Accessories",
            },
            {
                onSuccess: () => {
                    onClose();
                },
                onError: (err) => {
                    console.error("Update failed:", err);
                    alert("Update failed");
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-[#0f172a] p-6 rounded w-full max-w-md">

                <h2 className="text-white mb-4">Edit Item</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                        {...register("name")}
                        className="w-full mb-2 p-2 bg-[#1e293b] text-white rounded"
                    />

                    <input
                        {...register("price")}
                        type="number"
                        className="w-full mb-2 p-2 bg-[#1e293b] text-white rounded"
                    />

                    <select
                        {...register("category")}
                        className="w-full mb-4 p-2 bg-[#1e293b] text-white rounded"
                    >
                        <option>Audio</option>
                        <option>Peripherals</option>
                        <option>Accessories</option>
                    </select>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 px-4 py-2 text-white rounded"
                            disabled={isPending}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;