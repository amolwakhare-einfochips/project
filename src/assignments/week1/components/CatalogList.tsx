import ProductCardSkeleton from "../../../shared/ui/ProductCardSkeleton";
import { useTranslation } from "react-i18next";
import type { Product } from "../types/product";

import { useDeleteCatalogItemMutation } from "../hooks/useDeleteCatalogItemMutation";
import EditProductModal from "./EditProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

import { useState } from "react";

type Props = {
  data: (Product & { isSaving?: boolean })[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

const getIcon = (category?: string) => {
  switch (category) {
    case "Peripherals":
      return "🖱️";
    case "Audio":
      return "🎧";
    case "Accessories":
      return "🖥️";
    case "Video":
      return "📷";
    case "Energy":
      return "🔋";
    default:
      return "📦";
  }
};

const CatalogList = ({ data, isLoading, isError, onRetry }: Props) => {
  const { t } = useTranslation();
  const deleteMutation = useDeleteCatalogItemMutation();

  const [editItem, setEditItem] = useState<Product | null>(null);
  const [deleteItem, setDeleteItem] = useState<Product | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteItem) return;
    deleteMutation.mutate(deleteItem.id);
    setDeleteItem(null);
  };

  if (isError) {
    return (
      <div className="text-center text-red-400 py-10">
        {t("catalog.error")}
        <button onClick={onRetry} className="ml-3 px-3 py-1 border rounded">
          {t("common.retry")}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center text-gray-400">{t("catalog.empty")}</div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-[#1e293b] border border-gray-700 rounded-lg p-4 hover:border-blue-500"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#111827] rounded flex items-center justify-center text-lg">
                  {getIcon(product.category)}
                </div>

                <div>
                  <h3 className="text-white text-sm font-medium">
                    {product.name}
                  </h3>

                  <p className="text-blue-400 text-sm">
                    ${product.price.toFixed(2)}

                    {product.isSaving && (
                      <span className="ml-2 text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded">
                        Saving...
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end sm:justify-normal">
                <button
                  onClick={() => setEditItem(product)}
                  className="text-xs px-3 py-1 border border-gray-600 rounded text-gray-300 hover:text-white"
                >
                  {t("catalog.edit")}
                </button>

                <button
                  onClick={() => setDeleteItem(product)}
                  className="text-xs px-3 py-1 bg-red-600 rounded text-white"
                >
                  {t("catalog.delete")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <EditProductModal
          product={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {deleteItem && (
        <DeleteConfirmModal
          productName={deleteItem.name}
          onCancel={() => setDeleteItem(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default CatalogList;
