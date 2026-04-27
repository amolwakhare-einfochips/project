import React from "react";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  sort: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;

  onReset?: () => void;
  onApply?: () => void;

  layout?: "default" | "inline";
  hideFilters?: boolean;

  pageSize?: number;
  onPageSizeChange?: (value: number) => void;
};

const ListToolbar = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  onReset,
  onApply,
  layout = "default",
  hideFilters = false,
  pageSize,
  onPageSizeChange,
}: Props) => {

  if (layout === "inline") {
    return (
      <div className="mb-6 w-full">

        <div className="flex flex-col sm:flex-row gap-3 w-full">

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Search products..."
            className="w-full sm:flex-1 bg-[#1e293b] border border-gray-600 rounded-md px-4 py-2 text-sm text-white"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-auto bg-[#1e293b] border border-gray-600 px-4 py-2 rounded-md text-white"
          >
            <option value="">All</option>
            <option value="Audio">Audio</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value as "asc" | "desc")
            }
            className="w-full sm:w-auto bg-[#1e293b] border border-gray-600 px-4 py-2 rounded-md text-white"
          >
            <option value="asc">Price ↑</option>
            <option value="desc">Price ↓</option>
          </select>

        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 w-full">

      {/* TOP ROW */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Advanced search..."
          className="w-full sm:flex-1 bg-[#1e293b] border border-gray-600 rounded-md px-4 py-2 text-sm text-white"
        />

        <button
          onClick={onApply}
          className="w-full sm:w-auto bg-blue-600 px-4 py-2 rounded text-white"
        >
          Apply
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="w-full sm:w-auto border border-gray-600 px-4 py-2 rounded text-white"
          >
            Reset
          </button>
        )}

        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="w-full sm:w-auto bg-[#1e293b] border border-gray-600 px-3 py-2 rounded text-white"
          >
            <option value={10}>10 / page</option>
            <option value={12}>12 / page</option>
            <option value={15}>15 / page</option>
            <option value={25}>25 / page</option>
          </select>
        )}
      </div>

      {!hideFilters && (
        <div className="flex flex-col sm:flex-row gap-3 w-full">

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-auto bg-[#1e293b] border border-gray-600 px-4 py-2 rounded text-white"
          >
            <option value="">All</option>
            <option value="Audio">Audio</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value as "asc" | "desc")
            }
            className="w-full sm:w-auto bg-[#1e293b] border border-gray-600 px-4 py-2 rounded text-white"
          >
            <option value="asc">Price ↑</option>
            <option value="desc">Price ↓</option>
          </select>

        </div>
      )}
    </div>
  );
};

export default React.memo(ListToolbar);