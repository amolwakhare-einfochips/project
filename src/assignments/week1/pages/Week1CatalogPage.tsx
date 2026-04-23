import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import ResponsivePageShell from "../../../shared/ui/ResponsivePageShell";
import { useCatalogListQuery } from "../hooks/useCatalogListQuery";
import CatalogList from "../components/CatalogList";
import CreateProductModal from "../components/CreateProductModal";
import { useState, useMemo } from "react";
import type { Product } from "../types/product";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setSearch, setCategory, setSort } from "../../state/uiSlice";
import ListToolbar from "../../../shared/ui/ListToolbar";

const Week1CatalogPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { search, category, sort } = useSelector(
    (state: RootState) => state.ui
  );


  const { data, isLoading, isError, refetch, isFetching } =
    useCatalogListQuery({
      search,
      category,
    });

  const [openModal, setOpenModal] = useState(false);

  const changeLanguage = (lang: "en" | "es") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const processedData = useMemo(() => {
    let result = [...(data || [])]; // clone to avoid mutation

    // 🔍 SEARCH
    if (search.trim()) {
      result = result.filter((product: Product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(
        (product: Product) => product.category === category
      );
    }

    if (sort === "asc") {
      result.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sort === "desc") {
      result.sort((a: Product, b: Product) => b.price - a.price);
    }

    return result;
  }, [data, search, category, sort]);

  return (
    <ResponsivePageShell title="Catalog List">
      <div className="w-full max-w-6xl mx-auto bg-[#0f172a] border border-gray-700 rounded-xl p-4 sm:p-5 md:p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <div className="flex items-center gap-2 text-blue-400 font-medium text-sm sm:text-base">
            ⬡ Catalog
          </div>

          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => changeLanguage("en")}
              className={`hover:text-white ${
                i18n.language === "en" ? "text-white" : "text-gray-400"
              }`}
            >
              EN
            </button>

            <span className="text-gray-500">/</span>

            <button
              onClick={() => changeLanguage("es")}
              className={`hover:text-white ${
                i18n.language === "es" ? "text-white" : "text-gray-400"
              }`}
            >
              ES
            </button>
          </div>
        </div>

        {/* TITLE */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {t("catalog.pageTitle")}
          </h2>

          <button
            onClick={() => setOpenModal(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow"
          >
            + {t("catalog.create")}
          </button>
        </div>

        {/* TOOLBAR */}
        <ListToolbar
          layout="inline"
          search={search}
          onSearchChange={(value) => dispatch(setSearch(value))}
          category={category}
          onCategoryChange={(value) => dispatch(setCategory(value))}
          sort={sort}
          onSortChange={(value) => dispatch(setSort(value))}
        />

        {/* LIST */}
        <CatalogList
          data={processedData} // ✅ IMPORTANT
          isLoading={isLoading || isFetching}
          isError={isError}
          onRetry={refetch}
        />

        {/* MODAL */}
        {openModal && (
          <CreateProductModal onClose={() => setOpenModal(false)} />
        )}
      </div>
    </ResponsivePageShell>
  );
};

export default Week1CatalogPage;