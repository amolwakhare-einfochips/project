const ProductCardSkeleton = () => {
  return (
    <div className="bg-[#1e293b] border border-gray-700 rounded-lg p-4 animate-pulse">
      {/* IMAGE */}
      <div className="h-24 bg-gray-700/50 rounded mb-3" />

      {/* TITLE */}
      <div className="h-4 bg-gray-600/50 rounded w-3/4 mb-2" />

      {/* PRICE */}
      <div className="h-4 bg-gray-600/50 rounded w-1/2 mb-2" />

      {/* CATEGORY */}
      <div className="h-3 bg-gray-700/50 rounded w-1/3" />
    </div>
  );
};

export default ProductCardSkeleton;
