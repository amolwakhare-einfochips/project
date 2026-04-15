import { useState, useCallback } from "react";
import { useCatalogExplorerQuery } from "../hooks/useCatalogExplorerQuery";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import ProductCard from "../components/ProductCard";

const LIMIT = 10;

const CatalogExplorerPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search);

    const { data, isLoading, isError, refetch, isFetching } =
        useCatalogExplorerQuery({
            page,
            search: debouncedSearch,
        });

    const totalPages = Math.ceil((data?.total || 0) / LIMIT);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPage(1);
            setSearch(e.target.value);
        },
        []
    );

    const handleReset = useCallback(() => {
        setSearch("");
        setPage(1);
    }, []);

    const handlePrev = useCallback(() => {
        setPage((p) => p - 1);
    }, []);

    const handleNext = useCallback(() => {
        setPage((p) => p + 1);
    }, []);

    const handleRetry = useCallback(() => {
        refetch();
    }, [refetch]);

    return (
        <div className="bg-[#0f172a] min-h-screen p-6 text-white">
            <div className="max-w-6xl mx-auto bg-[#111827] rounded-xl p-6 border border-gray-700">


                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold">Catalog Explorer</h1>
                    <span className="text-sm text-gray-400">EN / ES</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">


                    <div className="flex flex-1 gap-3">
                        <input
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="🔍 Advanced search..."
                            className="flex-1 bg-[#1f2937] border border-gray-600 rounded px-3 py-2"
                        />

                        <button className="bg-blue-600 px-4 py-2 rounded">
                            Apply
                        </button>

                        <button
                            onClick={handleReset}
                            className="border px-4 py-2 rounded"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>
                            Page {page} / {totalPages || 1}
                        </span>

                        <span>~{data?.total ?? 0} results</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                    <div className="flex gap-2 items-center">
                        <button
                            disabled={page === 1}
                            onClick={handlePrev}
                            className="border px-2 py-1 rounded"
                        >
                            ← Prev
                        </button>

                        <button
                            disabled={page >= totalPages}
                            onClick={handleNext}
                            className="border px-2 py-1 rounded"
                        >
                            Next →
                        </button>
                    </div>
                </div>

                {isError && (
                    <div className="text-red-400 text-center mb-4">
                        Failed to load
                        <button
                            onClick={handleRetry}
                            className="ml-3 border px-2 py-1"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {isLoading || isFetching ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-[#1f2937] h-32 rounded animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data?.data?.map((item) => (
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