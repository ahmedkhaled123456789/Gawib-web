/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "./ProductCard";
import { ArrowUp } from "lucide-react";

interface Item {
  id: string;
  name: string;
  category_id: string;
  description: string;
  game_count: number;
  image: string;
  is_free: boolean;
}
interface ProductSectionProps {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  items: Item[];
}

const ProductSection = ({
  selectedIds,
  setSelectedIds,
  title,
  items,
}: ProductSectionProps) => {
  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else if (selectedIds.length < 6) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="my-4">
      <div className="flex items-center border-t rounded-l border-l border-[#085E9C] mb-5">
        <div className="bg-[#085E9C] border-l border-b border-[#085E9C] rounded-br text-[#FFC629] px-4 py-2 w-fit mb-2">
          {title}
        </div>
        <div className="border-l border-b border-[#085E9C] rounded-bl px-2 py-2 text-[#085E9C] w-fit mb-2">
          <ArrowUp />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(7,minmax(150px,1fr))] gap-6">
        {items.map((item: any) => (
          <ProductCard
            key={item.id}
            {...item}
            selected={selectedIds.includes(item.id)}
            disabled={selectedIds.length >= 6 && !selectedIds.includes(item.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
