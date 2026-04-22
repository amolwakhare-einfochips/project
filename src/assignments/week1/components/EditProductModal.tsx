import { useForm, useWatch } from "react-hook-form";
import { useUpdateCatalogItemMutation } from "../hooks/useUpdateCatalogItemMutation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";

type Props = {
  product: Product;
  onClose: () => void;
};

type FormData = {
  name: string;
  price: number;
  category: string;
};

const EditProductModal = ({ product, onClose }: Props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: product,
  });

  const { mutate, isPending } = useUpdateCatalogItemMutation();

  const nameValue = useWatch({ control, name: "name" });

  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!nameValue || nameValue === product.name) return;
    const timeout = setTimeout(() => {
      setChecking(true);
      if (nameValue.toLowerCase() === "nano") {
        setError("name", {
          message: t("errors.duplicateName"),
        });
      }
      setChecking(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [nameValue]);

  const onSubmit = (data: FormData) => {
    mutate(
      {
        id: product.id,
        name: data.name,
        price: data.price,
        category: data.category,
      },
      {
        onSuccess: onClose,
        onError: (err: unknown) => {
          const error = err as {
            fieldErrors?: Record<string, string>;
          };

          if (error?.fieldErrors) {
            Object.entries(error.fieldErrors).forEach(([field, message]) => {
              setError(field as keyof FormData, {
                message: message as string,
              });
            });
          }
        },
      }
    );
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
              className={`w-full mt-1 px-3 py-2 rounded bg-[#1e293b] text-white border ${errors.name ? "border-red-500" : "border-gray-600"
                }`}
            />

            {checking && !errors.name && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ⚠ {t("catalog.checking", "Checking uniqueness...")}
              </p>
            )}

            {/* ERROR */}
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ⚠ {errors.name.message}
              </p>
            )}
          </div>

          {/* PRICE */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">
              {t("catalog.price")} *
            </label>

            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: t("errors.priceRequired"),
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: t("errors.priceMin"),
                },
              })}
              className={`w-full mt-1 px-3 py-2 rounded bg-[#1e293b] text-white border ${errors.price ? "border-red-500" : "border-gray-600"
                }`}
            />

            {errors.price && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ⚠ {errors.price.message}
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="text-sm text-gray-300">
              {t("catalog.category")}
            </label>

            <select
              {...register("category")}
              className="w-full mt-1 px-3 py-2 rounded bg-[#1e293b] text-white border border-gray-600"
            >
              <option value="Audio">{t("catalog.audio")}</option>
              <option value="Peripherals">{t("catalog.peripherals")}</option>
              <option value="Accessories">{t("catalog.accessories")}</option>
            </select>
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