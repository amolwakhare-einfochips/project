import { useForm } from "react-hook-form";
import { useUpdateCatalogItemMutation } from "../hooks/useUpdateCatalogItemMutation";
import type { Product } from "../types/product";

type Props = {
  product: Product;
  onClose: () => void;
};

// type ApiError = {
//   fieldErrors?: Record<string, string>;
// };

const EditProductModal = ({ product, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Product>({
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
        onSuccess: () => onClose(),
        onError: (err: unknown) => {
          const error = err as { fieldErrors?: Record<string, string> };

          if (error?.fieldErrors) {
            Object.entries(error.fieldErrors).forEach(([field, message]) => {
              setError(field as keyof Product, {
                message,
              });
            });
          }
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-6 rounded w-full max-w-md border border-gray-700">
        <h2 className="text-white mb-4">Edit Item</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "Name required" })}
            className="w-full mb-1 p-2 bg-[#1e293b] text-white rounded"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mb-2">
              {errors.name.message}
            </p>
          )}

          <input
            {...register("price", { required: "Price required" })}
            type="number"
            className="w-full mb-1 p-2 bg-[#1e293b] text-white rounded"
          />
          {errors.price && (
            <p className="text-red-400 text-xs mb-2">
              {errors.price.message}
            </p>
          )}

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
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;