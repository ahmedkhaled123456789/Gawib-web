import Footer from "../components/Footer";
import GameSetup from "../components/GameSetup";
// import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/products/ProductSection";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { getCategories, getCategoriesAuth } from "../store/categoriesSlice";
import Header from "../components/Header";
const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getCategoriesAuth());
    } else {
      dispatch(getCategories());
    }
    // dispatch(getGamePackages());
  }, [dispatch]);

  return (
    <>
      {/* Header with Menu Icon */}
      <Header />
      <div className="px-12">
        <HeroSection categories={categories} loading={loading} error={error} />

        {categories.map((cat) => (
          <div id={`category-${cat.id}`} key={cat.id}>
            <ProductSection
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              title={cat.name}
              items={cat.games ?? []}
              isFirstGame={user?.is_first_game} // 👈 نضيف دا
            />
          </div>
        ))}

        {/* للعرض */}
        <div className="mt-4 text-sm text-gray-700">
          المختارة: {selectedIds.join(", ") || "لا يوجد"}
        </div>
        <GameSetup selectedIds={selectedIds} user={user} />
        {/* Footer */}
        <Footer
          selectedIds={selectedIds}
          allGames={categories.flatMap((cat) => cat.games ?? [])}
        />
      </div>
    </>
  );
};

export default HomePage;
