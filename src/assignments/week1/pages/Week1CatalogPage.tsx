import { useTranslation } from "react-i18next";
import ResponsivePageShell from "../../../shared/ui/ResponsivePageShell";
import { useCatalogListQuery } from "../hooks/useCatalogListQuery";
import CatalogList from "../components/CatalogList";
import { useState } from "react";
import type { Product } from "../types/product";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setSearch, setCategory, setSort } from "../../state/uiSlice";

const Week1CatalogPage = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError, refetch } = useCatalogListQuery();
  const [forceLoading, setForceLoading] = useState(false);
  const showLoading = isLoading || forceLoading;

  const dispatch = useDispatch();
  const { search, category, sort } = useSelector(
    (state: RootState) => state.ui
  );

  // FILTER + SORT
  let processedData: Product[] = (data as Product[] | undefined) ?? [];

  processedData = processedData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "all") {
    processedData = processedData.filter(
      (item) => item.category === category
    );
  }

  processedData = [...processedData].sort((a, b) => {
    const priceA = a.price ?? 0;
    const priceB = b.price ?? 0;
    return sort === "asc" ? priceA - priceB : priceB - priceA;
  });

  return (
    <ResponsivePageShell title="">
      <div className="bg-surface border border-border rounded-xl p-4">

        {/* HEADER */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-1 border border-accent text-accent rounded">
                W1-S1
              </span>

              <h2 className="font-semibold text-lg">
                {t("catalog.title")}
              </h2>

              <button
                onClick={() => setForceLoading((prev) => !prev)}
                className="ml-2 px-2 py-1 text-xs border border-accent text-accent rounded"
              >
                Toggle Loading
              </button>
            </div>

            <span className="text-xs text-gray-400">/week1/catalog</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 border-t border-border pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>

              <span className="ml-2">
                {showLoading
                  ? t("catalog.loading")
                  : t("catalog.success")}
              </span>
            </div>

            <span className="px-2 py-1 border border-accent text-accent rounded text-xs">
              {showLoading ? "any breakpoint" : "lg · 3col"}
            </span>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-accent font-semibold">⬡ Catalog</span>
          <span className="text-sm text-gray-400">EN / ES</span>
        </div>

        {/* PAGE HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {t("catalog.pageTitle")}
          </h2>

          <button className="bg-accent text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">
            + {t("catalog.create")}
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="flex gap-2 mb-4">

          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder={t("catalog.search")}
            className="flex-1 bg-surface2 border border-border rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
          />

          <select
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="bg-surface2 border border-border px-3 py-2 rounded text-sm text-white"
          >
            <option value="all">All</option>
            <option value="Audio">Audio</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            value={sort}
            onChange={(e) =>
              dispatch(setSort(e.target.value as "asc" | "desc"))
            }
            className="bg-surface2 border border-border px-3 py-2 rounded text-sm text-white"
          >
            <option value="asc">Price ↑</option>
            <option value="desc">Price ↓</option>
          </select>
        </div>

        {/* LIST */}
        <CatalogList
          data={processedData}
          isLoading={showLoading}
          isError={isError}
          onRetry={refetch}
        />

        {/* FOOTER */}
        <div className="mt-4 border-t border-border pt-3 flex items-center gap-2 text-sm">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              showLoading
                ? "bg-yellow-900 text-yellow-400"
                : "bg-green-900 text-green-400"
            }`}
          >
            {showLoading ? t("common.loading") : t("common.success")}
          </span>

          <span className="text-gray-400 text-xs">
            {showLoading
              ? "Animated skeleton cards"
              : "3-col grid on lg"}
          </span>
        </div>

      </div>
    </ResponsivePageShell>
  );
};

export default Week1CatalogPage;