import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import ResponsivePageShell from "../../../shared/ui/ResponsivePageShell";
import { useCatalogListQuery } from "../hooks/useCatalogListQuery";
import CatalogList from "../components/CatalogList";
import CreateProductModal from "../components/CreateProductModal";
import { useState } from "react";
import type { Product } from "../types/product";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setSearch, setCategory, setSort } from "../../state/uiSlice";

const Week1CatalogPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { search, category, sort } = useSelector(
    (state: RootState) => state.ui
  );

  const { data, isLoading, isError, refetch } = useCatalogListQuery({
    search,
    category,
    sort,
  });

  const [openModal, setOpenModal] = useState(false);

  const changeLanguage = (lang: "en" | "es") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <ResponsivePageShell title="Catalog List">
      <div className="w-full max-w-6xl mx-auto bg-[#0f172a] border border-gray-700 rounded-xl p-4 sm:p-5 md:p-6">

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

        {/* HEADER */}
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

        {/* TOOLBAR  */}
        <div className="flex flex-col gap-3 mb-6">

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder={t("catalog.search")}
            className="w-full bg-[#1e293b] border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400"
          />

          {/* FILTER + SORT */}
          <div className="flex flex-col sm:flex-row gap-3">

            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="w-full sm:w-auto bg-[#1e293b] border border-gray-600 px-4 py-2 rounded-md text-sm text-white"
            >
              <option value="all">{t("catalog.all")}</option>
              <option value="Audio">{t("catalog.audio")}</option>
              <option value="Peripherals">
                {t("catalog.peripherals")}
              </option>
              <option value="Accessories">
                {t("catalog.accessories")}
              </option>
            </select>

            <select
              value={sort}
              onChange={(e) =>
                dispatch(setSort(e.target.value as "asc" | "desc"))
              }
              className="w-full sm:w-auto bg-[#1e293b] border border-gray-600 px-4 py-2 rounded-md text-sm text-white"
            >
              <option value="asc">{t("catalog.priceAsc")}</option>
              <option value="desc">{t("catalog.priceDesc")}</option>
            </select>

          </div>
        </div>

        {/* LIST */}
        <CatalogList
          data={(data as Product[]) || []}
          isLoading={isLoading}
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