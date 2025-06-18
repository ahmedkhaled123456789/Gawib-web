// components/CategoryGrid.tsx
type Category = {
  id: number;
  title: string;
  iconUrl?: string;
};

const categories: Category[] = [
  { id: 1, title: "عامة",iconUrl: "/images/categories/c5.png" },
  { id: 2, title: "منوعة", iconUrl: "/images/categories/c3.png" },
  { id: 3, title: "السعودية", iconUrl: "/images/categories/c1.png" },
  { id: 4, title: "فنون", iconUrl: "/images/categories/c2.png" },
  { id: 5, title: "رياضة", iconUrl: "/images/categories/c3.png" },
  { id: 6, title: "دول وجغرافيا", iconUrl: "/images/categories/c4.png" },
  { id: 7, title: "علوم", iconUrl: "/images/categories/c5.png" },
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mt-12">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white  border border-black shadow  text-center hover:bg-blue-50 transition">
          <div className="h-24 flex items-center justify-center mb-2">
            {cat.iconUrl ? (
              <img src={cat.iconUrl} alt={cat.title} className="h-16 mx-auto" />
            ) : (
              <div className="h-12 w-12 bg-gray-100 rounded" />
            )}
          </div>
          <p className="text-lg font-bold  p-2 border-t border-black font-medium text-blue-900">{cat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
