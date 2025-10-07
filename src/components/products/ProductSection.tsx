/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "./ProductCard";
import { ArrowUp } from "lucide-react";

interface Item {
  id: string;
  name: string;
  category_id: string;
  description: string;
  game_count?: number;
  image: string;
  is_free: boolean;
}
interface ProductSectionProps {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  items: Item[];
  isFirstGame?: boolean; // 👈 إضافة جديدة
}

const ProductSection = ({
  selectedIds,
  setSelectedIds,
  title,
  items,
  isFirstGame,
}: ProductSectionProps) => {
  const handleSelect = (id: string) => {
    if (isFirstGame) return; // 👈 لا تسمح بالاختيار لو أول لعبة
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
        <button
          onClick={() => {
            const section = document.querySelector("section");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="border-l border-b border-[#085E9C] rounded-bl px-2 py-2 text-[#085E9C] w-fit mb-2 hover:bg-blue-50 transition"
        >
          <ArrowUp />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {items.map((item: any) => (
          <ProductCard
            key={item.id}
            {...item}
            selected={selectedIds.includes(item.id)}
            disabled={
              isFirstGame || // 👈 الكل disabled لو أول لعبة
              (selectedIds.length >= 6 && !selectedIds.includes(item.id)) ||
              item.game_count === 0
            }
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
