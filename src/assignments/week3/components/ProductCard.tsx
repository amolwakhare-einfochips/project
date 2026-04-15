import React from "react";

type Props = {
  id: number;
  name: string;
  price: number;
  category?: string;
};

const getIcon = (category?: string) => {
  switch (category) {
    case "Peripherals":
      return "🖱️";
    case "Audio":
      return "🎧";
    case "Accessories":
      return "🖥️";
    case "Video":
      return "📷";
    case "Energy":
      return "🔋";
    default:
      return "📦";
  }
};

const ProductCard = React.memo(function ProductCard({
  name,
  price,
  category,
}: Props) {
  return (
    <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-5 hover:border-blue-500 transition">
      
      <div className="h-20 bg-[#0b1220] rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl">{getIcon(category)}</span>
      </div>

      <h3 className="text-white text-sm font-medium">
        {name}
      </h3>

      <p className="text-blue-400 text-sm mt-1 font-semibold">
        ${price.toFixed(2)}
      </p>
    </div>
  );
});

export default ProductCard;