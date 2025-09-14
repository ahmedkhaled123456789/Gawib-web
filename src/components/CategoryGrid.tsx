import type { CategoryData } from "../store/categoriesSlice";

interface HeroSectionProps {
  categories: CategoryData[];
  loading: boolean;
  error: string | null;
}

const CategoryGrid = ({ categories, loading, error }: HeroSectionProps) => {
  if (loading) return <p className="text-center">جاري التحميل...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleCategoryClick = (id: string) => {
    const section = document.getElementById(`category-${id}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mt-12">
      {categories.length > 0 ? (
        categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="bg-white cursor-pointer border border-black shadow text-center hover:bg-blue-50 transition"
          >
            <div className="h-24 flex items-center justify-center mb-2">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="h-16 mx-auto" />
              ) : (
                <div className="h-12 w-12 rounded" />
              )}
            </div>
            <p className="text-lg font-bold p-2 border-t border-black text-[#085E9C]">
              {cat.name}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">لا توجد فئات متاحة</p>
      )}
    </div>
  );
};

export default CategoryGrid;
