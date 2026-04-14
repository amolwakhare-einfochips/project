import { useForm } from "react-hook-form";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useTranslation } from "react-i18next";

type FormData = {
  name: string;
  price: number;
  category: string;
};

const CreateProductModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
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
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-lg w-full max-w-md border border-gray-700">
        <h2 className="text-lg mb-4 text-white font-semibold">
          {t("catalog.createTitle")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className="mb-3">
            <input
              {...register("name", {
                required: t("errors.nameRequired"),
              })}
              placeholder={t("catalog.name")}
              className={`w-full p-2 rounded bg-[#1e293b] text-white border ${
                errors.name ? "border-red-500" : "border-gray-600"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ⚠ {errors.name.message}
              </p>
            )}
          </div>

          {/* PRICE */}
          <div className="mb-3">
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
              placeholder={t("catalog.price")}
              className={`w-full p-2 rounded bg-[#1e293b] text-white border ${
                errors.price ? "border-red-500" : "border-gray-600"
              }`}
            />
            {errors.price && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                ⚠ {errors.price.message}
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <select
            {...register("category")}
            className="w-full mb-4 p-2 bg-[#1e293b] text-white rounded border border-gray-600"
          >
            <option value="Peripherals">{t("catalog.peripherals")}</option>
            <option value="Audio">{t("catalog.audio")}</option>
            <option value="Accessories">{t("catalog.accessories")}</option>
          </select>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="text-gray-300">
              {t("common.cancel")}
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              {isPending ? t("common.creating") : t("common.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;