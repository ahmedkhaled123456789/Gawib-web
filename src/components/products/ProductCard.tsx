import React, { useState } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  gamesCount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, gamesCount }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative   mb-4">
     <div className="bg-white border border-[#085E9C] rounded-xl shadow-md overflow-hidden pb-4 text-center transition hover:shadow-lg">

         {/* Top tab */}
      <div className="absolute -top-5 left-4  bg-[#F6F1EF] border border-[#085E9C] rounded-tr-3xl rounded-bl-3xl px-10 py-2 text-[#085E9C] font-bold text-sm shadow">
        {gamesCount} لعبة
      </div>

      <div className="absolute top-0 right-0 bg-[#085E9C] text-[#FFC629] rounded-bl-2xl rounded-tr-xl px-4 py-1 flex items-center justify-center">
       ?
      </div> 

      <div className="mt-10 px-4">
        {image?
        (
          <img
          src={imgError ? "" : image}
          alt={title}
          onError={() => setImgError(true)}
          className="w-full h-28 object-contain"
        />
        ):(
          <div className="w-full h-28 "></div>
        )
        }
        
      </div>

      <div
        className="mt-6 bg-gray-100 rounded-lg mx-4 py-2 font-bold text-[#085E9C] shadow-inner"
        title={title}
      >
        {title}
      </div>
     </div>
    </div>
  );
};

export default ProductCard;

