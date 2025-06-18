import React from "react";
import ProductCard from "./ProductCard";
import { ArrowUp } from "lucide-react";

interface ProductSectionProps {
  title: string;
  items: {
    image: string;
    title: string;
    gamesCount: number;
  }[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, items }) => {
  return (
    <div className="my-4 ">
        <div className="flex items-center border-t  rounded-l border-l border-[#085E9C] mb-5">
            
      <div className="bg-[#085E9C] border-l border-b  border-[#085E9C] rounded-br text-[#FFC629] px-4 py-2  w-fit mb-2">{title}</div>
      <div className=" border-l border-b border-[#085E9C] rounded-bl px-2  py-2 text-[#085E9C] w-fit mb-2"><ArrowUp /></div>
        </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
  {items.map((item, index) => (
    <ProductCard key={index} {...item} />
  ))}
</div>
    </div>
  );
};

export default ProductSection;
