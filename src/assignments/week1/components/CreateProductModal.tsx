import { useState } from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";

type Props = {
  onClose: () => void;
};

const CreateProductModal = ({ onClose }: Props) => {
  const { mutate, isPending } = useCreateProduct();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Peripherals",
  });

  const handleSubmit = () => {
    mutate(
      {
        ...form,
        price: Number(form.price),
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-lg w-full max-w-md border border-gray-700">

        <h2 className="text-lg mb-4 text-white font-semibold">
          Create Product
        </h2>

        {/* NAME */}
        <input
          placeholder="Name"
          className="w-full mb-3 p-2 rounded bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 outline-none"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* PRICE */}
        <input
          placeholder="Price"
          type="number"
          className="w-full mb-3 p-2 rounded bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 outline-none"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        {/* CATEGORY */}
        <select
          className="w-full mb-4 p-2 rounded bg-[#1e293b] border border-gray-600 text-white"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option>Peripherals</option>
          <option>Audio</option>
          <option>Accessories</option>
        </select>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {isPending ? "Creating..." : "Create"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;