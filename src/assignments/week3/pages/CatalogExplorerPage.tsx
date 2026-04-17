import { useState, useCallback } from "react";
import { useCatalogExplorerQuery } from "../hooks/useCatalogExplorerQuery";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import ProductCard from "../components/ProductCard";
import ListToolbar from "../../../shared/ui/ListToolbar";
import Pagination from "../../../shared/ui/Pagination";
import { useQueryClient } from "@tanstack/react-query";

const LIMIT = 10;

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

const CatalogExplorerPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, refetch, isFetching } =
    useCatalogExplorerQuery({
      page,
      search: debouncedSearch,
      category,
      sort,
    });

  const totalPages = Math.ceil((data?.total || 0) / LIMIT);

  // HANDLERS
  const handleSearchChange = useCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setPage(1);
    setCategory(value);
  }, []);

  const handleSortChange = useCallback((value: "asc" | "desc") => {
    setSort(value);
  }, []);

  // const handleRetry = useCallback(() => {
  //   refetch();
  // }, [refetch]);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setSort("asc");
    setPage(1);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto bg-[#111827] rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Catalog Explorer</h1>
          <span className="text-sm text-gray-400">EN / ES</span>
        </div>

        <ListToolbar
          search={search}
          onSearchChange={handleSearchChange}
          category={category}
          onCategoryChange={handleCategoryChange}
          sort={sort}
          onSortChange={handleSortChange}
          onReset={handleReset}
          showPageSize={true}
          reset={true}
        />

        <Pagination
          page={page}
          totalPages={totalPages || 1}
          totalItems={data?.total}
          onPageChange={setPage}
        />

        {isError && (
          <div className="text-red-400 text-center mt-4">
            Failed to load
            <button
              onClick={() =>
                queryClient.invalidateQueries({
                  queryKey: ["products"],
                })
              }
              className="ml-3 border px-2 py-1"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#1f2937] h-32 rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {data?.data?.map((item: Product) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogExplorerPage;