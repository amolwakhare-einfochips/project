import { useState, useCallback } from "react";
import { useCatalogExplorerQuery } from "../hooks/useCatalogExplorerQuery";
import ProductCard from "../components/ProductCard";
import ListToolbar from "../../../shared/ui/ListToolbar";
import Pagination from "../../../shared/ui/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

const CatalogExplorerPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError, isFetching } =
    useCatalogExplorerQuery({
      page,
      limit,
      search: appliedSearch,
      category,
      sort,
    });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleApply = () => {
    setPage(1);
    setAppliedSearch(searchInput);
  };

  const handleCategoryChange = useCallback((value: string) => {
    setPage(1);
    setCategory(value);
  }, []);

  const handleSortChange = useCallback((value: "asc" | "desc") => {
    setSort(value);
  }, []);

  const handleReset = () => {
    setSearchInput("");
    setAppliedSearch("");
    setCategory("all");
    setSort("asc");
    setPage(1);
    setLimit(10);
  };

  const handlePageSizeChange = (value: number) => {
    setPage(1);
    setLimit(value);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto bg-[#111827] rounded-xl p-6 border border-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Catalog Explorer</h1>
          <span className="text-sm text-gray-400">EN / ES</span>
        </div>

        {/* TOOLBAR */}
        <ListToolbar
          search={searchInput}
          onSearchChange={handleSearchChange}
          onApply={handleApply}
          onReset={handleReset}
          category={category}
          onCategoryChange={handleCategoryChange}
          sort={sort}
          onSortChange={handleSortChange}
          hideFilters={true}
          pageSize={limit}
          onPageSizeChange={handlePageSizeChange}
        />

        {/* PAGINATION */}
        <Pagination
          page={page}
          totalPages={totalPages || 1}
          totalItems={data?.total}
          onPageChange={setPage}
        />

        {/* ERROR STATE */}
        {isError && (
          <div className="text-red-400 text-center mt-4">
            {t("catalog.error")}
            <button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["products"] })
              }
              className="ml-3 border px-2 py-1"
            >
              {t("common.retry")}
            </button>
          </div>
        )}

        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="bg-[#1f2937] h-32 rounded-lg animate-pulse border border-gray-700"
              />
            ))}
          </div>
        ) : data?.data?.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
            <div className="text-4xl mb-2">📦</div>

            <p className="text-lg font-medium">
              {t("catalog.empty", "No products found")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {data?.data?.map((item: Product) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogExplorerPage;