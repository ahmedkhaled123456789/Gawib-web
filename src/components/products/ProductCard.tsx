import { useState } from "react";
import ModalCardDescription from "../ModalCardDescription";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  gamesCount: number;
  selected: boolean;
  game_count?: number;
  disabled: boolean;
  description?: string;
  onSelect: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  game_count,
  selected,
  disabled,
  description,
  onSelect,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          if (!disabled && game_count !== 0) {
            onSelect(id);
          }
        }}
        className={`relative mb-4 cursor-pointer transition 
    ${
      disabled || game_count === 0
        ? "opacity-40 cursor-not-allowed"
        : "hover:shadow-lg"
    }
    ${selected ? "ring-4 ring-[#085E9C] rounded-xl" : ""}
/>`}
      >
        <div className="bg-white border border-[#085E9C] rounded-xl shadow-md overflow-hidden pb-4 text-center">
          {/* Top tab */}
          <div className="absolute -top-5 left-4 bg-[#F6F1EF] border border-[#085E9C] rounded-tr-3xl rounded-bl-3xl px-10 py-2 text-[#085E9C] font-bold text-sm shadow">
            {game_count} لعبة
          </div>

          {/* علامة الاستفهام */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="absolute -top-1 right-0 bg-[#085E9C] text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow transition-transform transform hover:scale-110 hover:bg-[#064b79]"
          >
            ?
          </button>

          {/* صورة */}
          <div>
            {image ? (
              <img
                src={imgError ? "" : image}
                alt={name}
                onError={() => setImgError(true)}
                className="w-full h-36 object-cover"
              />
            ) : (
              <div className="w-full h-28"></div>
            )}
          </div>

          <div className="border-t border-black mt-8"></div>
          <div
            className="mt-2 rounded-lg mx-4 py-2 font-bold text-[#085E9C] "
            title={name}
          >
            {name}
          </div>
        </div>
      </div>

      {/* المودال */}
      <ModalCardDescription
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={name}
        description={description}
      />
    </>
  );
};

export default ProductCard;
