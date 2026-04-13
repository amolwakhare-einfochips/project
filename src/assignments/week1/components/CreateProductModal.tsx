import { useForm } from "react-hook-form";
import { useCreateProduct } from "../hooks/useCreateProduct";

// type ApiError = {
//   fieldErrors?: Record<string, string>;
// };

type FormData = {
  name: string;
  price: number;
  category: string;
};

const CreateProductModal = ({ onClose }: { onClose: () => void }) => {
  const { mutate, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: onClose,

      onError: (err: unknown) => {
        const error = err as { fieldErrors?: Record<string, string> };

        if (error?.fieldErrors) {
          Object.entries(error.fieldErrors).forEach(([field, message]) => {
            setError(field as keyof FormData, {
              message,
            });
          });
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-lg w-full max-w-md border border-gray-700">
        <h2 className="text-lg mb-4 text-white font-semibold">
          Create Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "Name required" })}
            placeholder="Name"
            className="w-full mb-1 p-2 bg-[#1e293b] text-white rounded"
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}

          <input
            {...register("price", { required: "Price required" })}
            type="number"
            placeholder="Price"
            className="w-full mb-1 p-2 bg-[#1e293b] text-white rounded"
          />
          {errors.price && <p className="text-red-400">{errors.price.message}</p>}

          <select
            {...register("category")}
            className="w-full mb-4 p-2 bg-[#1e293b] text-white rounded"
          >
            <option>Peripherals</option>
            <option>Audio</option>
            <option>Accessories</option>
          </select>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;