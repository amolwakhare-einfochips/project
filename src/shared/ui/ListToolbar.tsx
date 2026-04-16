import React from "react";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;

    category: string;
    onCategoryChange: (value: string) => void;

    sort: "asc" | "desc";
    onSortChange: (value: "asc" | "desc") => void;

    onReset: () => void;

    showPageSize?: boolean;

};

const ListToolbar = ({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
    onReset,
    showPageSize,
}: Props) => {
    return (
        <div className="mb-4">
            {/* TOP ROW */}
            <div className="flex items-center gap-2 mb-3">
                <input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="🔍 Advanced search..."
                    className="flex-1 bg-[#1e293b] border border-gray-600 rounded-md px-4 py-2 text-sm text-white"
                />

                <button className="bg-blue-600 px-4 py-2 rounded">
                    Apply
                </button>

                <button
                    onClick={onReset}
                    className="border border-gray-600 px-4 py-2 rounded"
                >
                    Reset
                </button>

                {showPageSize && (
                    <select className="bg-[#1e293b] border border-gray-600 px-3 py-2 rounded text-sm text-white">
                        <option>10 / page</option>
                    </select>
                )}
            </div>
            <div className="flex gap-3">
                <select
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="bg-[#1e293b] border border-gray-600 px-4 py-2 rounded text-white"
                >
                    <option value="all">All</option>
                    <option value="Audio">Audio</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Accessories">Accessories</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) =>
                        onSortChange(e.target.value as "asc" | "desc")
                    }
                    className="bg-[#1e293b] border border-gray-600 px-4 py-2 rounded text-white"
                >
                    <option value="asc">Price ↑</option>
                    <option value="desc">Price ↓</option>
                </select>
            </div>
        </div>
    );
};

export default React.memo(ListToolbar);