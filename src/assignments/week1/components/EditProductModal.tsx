import { useForm, useWatch } from "react-hook-form";
import { useUpdateCatalogItemMutation } from "../hooks/useUpdateCatalogItemMutation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";

type Props = {
  product: Product;
  products: Product[];
  onClose: () => void;
};

type FormData = {
  name: string;
  price: string; // ✅ string (important)
  category: string;
};

const EditProductModal = ({ product, products, onClose }: Props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate, isPending } = useUpdateCatalogItemMutation();

  const nameValue = useWatch({ control, name: "name" });
  const [checking, setChecking] = useState(false);

  // ✅ Reset form when modal opens
  useEffect(() => {
    reset({
      name: product.name,
      price: String(product.price), // convert to string
      category: product.category || "",
    });
  }, [product, reset]);

  // ✅ Duplicate name validation
  useEffect(() => {
    if (!nameValue || nameValue === product.name) return;

    const timeout = setTimeout(() => {
      setChecking(true);

      const isDuplicate = products.some(
        (p) =>
          p.name.toLowerCase() === nameValue.toLowerCase() &&
          p.id !== product.id
      );

      if (isDuplicate) {
        setError("name", {
          message: t("errors.duplicateName"),
        });
      }

      setChecking(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [nameValue, products, product.id, product.name, setError, t]);

  // ✅ FINAL SUBMIT
  const onSubmit = (data: FormData) => {
    const priceNumber = Number(data.price);

    if (!data.price) {
      setError("price", { message: "Price required" });
      return;
    }

    if (isNaN(priceNumber)) {
      setError("price", { message: "Invalid price" });
      return;
    }

    if (priceNumber <= 0) {
      setError("price", { message: "Price must be > 0" });
      return;
    }

    if (!data.category) {
      setError("category", { message: "Category is required" });
      return;
    }

    const payload = {
      id: product.id,
      name: data.name.trim(),
      price: priceNumber, // ✅ safe conversion
      category: data.category,
    };

    console.log("FINAL PAYLOAD:", payload);

    mutate(payload, {
      onSuccess: onClose,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-md border border-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">
            {t("catalog.editTitle")}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* NAME */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">
              {t("catalog.name")} *
            </label>

            <input
              {...register("name", {
                required: t("errors.nameRequired"),
              })}
              className={`w-full mt-1 px-3 py-2 rounded bg-[#1e293b] text-white border ${
                errors.name ? "border-red-500" : "border-gray-600"
              }`}
            />

            {checking && !errors.name && (
              <p className="text-yellow-400 text-xs mt-1">
                {t("catalog.checking")}
              </p>
            )}

            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* ✅ PRICE (FINAL FIX) */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">
              {t("catalog.price")} *
            </label>

            <input
              type="text" // ✅ KEY FIX
              placeholder="e.g. 29.99"
              {...register("price", {
                required: t("errors.priceRequired"),
                validate: (value) => {
                  const num = Number(value);

                  if (!value) return "Price required";
                  if (isNaN(num)) return "Invalid number";
                  if (num <= 0) return "Price must be > 0";

                  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                    return "Max 2 decimal places allowed";
                  }

                  return true;
                },
              })}
              className={`w-full mt-1 px-3 py-2 rounded bg-[#1e293b] text-white border ${
                errors.price ? "border-red-500" : "border-gray-600"
              }`}
            />

            {errors.price && (
              <p className="text-red-400 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="text-sm text-gray-300">
              {t("catalog.category")} *
            </label>

            <select
              {...register("category", {
                required: "Category is required",
              })}
              className={`w-full mt-1 px-3 py-2 rounded bg-[#1e293b] text-white border ${
                errors.category ? "border-red-500" : "border-gray-600"
              }`}
            >
              <option value="">Select category</option>
              <option value="Audio">{t("catalog.audio")}</option>
              <option value="Peripherals">{t("catalog.peripherals")}</option>
              <option value="Accessories">{t("catalog.accessories")}</option>
            </select>

            {errors.category && (
              <p className="text-red-400 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded text-gray-300"
            >
              {t("common.cancel")}
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            >
              {isPending ? t("common.updating") : t("common.update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;