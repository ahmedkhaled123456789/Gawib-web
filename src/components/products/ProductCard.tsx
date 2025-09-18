import React, { useState } from "react";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  gamesCount: number;
  selected: boolean;
  game_count?: number;
  disabled: boolean;
  onSelect: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  game_count,
  selected,
  disabled,
  onSelect,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => !disabled && onSelect(id)} // ممنوع الضغط لو Disabled
      className={`relative mb-4 cursor-pointer transition 
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg"}
        ${selected ? "ring-4 ring-[#085E9C] rounded-xl" : ""}
      `}
    >
      <div className="bg-white border border-[#085E9C] rounded-xl shadow-md overflow-hidden pb-4 text-center">
        {/* Top tab */}
        <div className="absolute -top-5 left-4 bg-[#F6F1EF] border border-[#085E9C] rounded-tr-3xl rounded-bl-3xl px-10 py-2 text-[#085E9C] font-bold text-sm shadow">
          {game_count ?? 0} لعبة
        </div>

        {/* Selected Badge */}
        {/* {selected && (
          <div className="absolute top-0 right-0 bg-[#085E9C] text-[#FFC629] rounded-bl-2xl rounded-tr-xl px-4 py-1 flex items-center justify-center">
            ✓
          </div>
        )} */}

        <div className="mt-10 px-4">
          {image ? (
            <img
              src={imgError ? "" : image}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-28 object-contain"
            />
          ) : (
            <div className="w-full h-28"></div>
          )}
        </div>

        <div
          className="mt-6 bg-gray-100 rounded-lg mx-4 py-2 font-bold text-[#085E9C] shadow-inner"
          title={name}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
