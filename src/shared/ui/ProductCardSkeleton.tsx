const ProductCardSkeleton = () => {
  return (
    <div className="bg-surface2 border border-border rounded-lg p-4 animate-pulse">
      {/* Image */}
      <div className="h-16 bg-[#1e2438] rounded mb-3" />

      {/* Name */}
      <div className="h-3 bg-gray-600 rounded w-3/4 mb-2" />

      {/* Price */}
      <div className="h-3 bg-gray-700 rounded w-1/3 mb-2" />

      {/* Category */}
      <div className="h-2 bg-gray-700 rounded w-1/2" />
    </div>
  );
};

export default ProductCardSkeleton;