import ProductCardSkeleton from "../../../shared/ui/ProductCardSkeleton";
import { useTranslation } from "react-i18next";
import type { Product } from "../types/product";

const getIcon = (category: string | undefined) => {
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

type Props = {
  data: Product[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

const CatalogList = ({ data, isLoading, isError, onRetry }: Props) => {
  const { t } = useTranslation();

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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        {t("catalog.empty")}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {data.map((product) => (
        <div
          key={product.id}
          className="bg-surface2 border border-border rounded-lg p-4"
        >
          <div className="h-16 bg-[#1e2438] rounded mb-3 flex items-center justify-center text-2xl">
            {getIcon(product.category)}
          </div>

          <h3 className="font-medium text-sm">{product.name}</h3>

          <p className="text-accent text-sm font-mono">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-400 text-xs">{product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default CatalogList;