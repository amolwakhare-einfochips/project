import { useTranslation } from "react-i18next";

type Props = {
  productName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteConfirmModal = ({ productName, onCancel, onConfirm }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] border border-red-500 rounded-xl p-6 w-[350px] text-center">
        <div className="text-4xl mb-3">🗑️</div>

        <h2 className="text-white text-lg font-semibold mb-2">
          {t("catalog.deleteTitle")}
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          {t("catalog.deleteMessage", { name: productName })}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-600 rounded text-gray-300"
          >
            {t("common.cancel")}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded text-white"
          >
            {t("catalog.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
