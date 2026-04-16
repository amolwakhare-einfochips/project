import React from "react";

type Props = {
  page: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border border-gray-600 rounded disabled:opacity-40"
        >
          ← Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border border-gray-600 rounded disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      <div>
        ~{totalItems ?? 0} results
      </div>
    </div>
  );
};

export default React.memo(Pagination);