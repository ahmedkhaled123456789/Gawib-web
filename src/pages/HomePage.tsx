import Footer from "../components/Footer";
import GameSetup from "../components/GameSetup";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/products/ProductSection";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { getCategories } from "../store/categoriesSlice";
 import { getGamePackages } from "../store/GamePackagesSlice";
 const products = [
  {
    title: "دول وجغرافيا",
    items: [
      {id: "1", image: "/images/products/p6.png", title: "لغات  ", gamesCount: 120 },
      {id: "2", image: "/images/products/p5.png", title: "أعلام", gamesCount: 120 },
      {id: "3",  image: "/images/products/p4.png", title: "عواصم", gamesCount: 120 },
      {id: "4",  image: "/images/products/p3.png", title: "معالم", gamesCount: 120 },
      {id: "5",  image: "/images/products/p2.png", title: "عملات", gamesCount: 120 },
      {id: "6",  image: "/images/products/p1.png", title: "دول وعواصم", gamesCount: 120 },
      {id: "7",  image: "", title: "فتح خط دولي  ", gamesCount: 120 },
      {id: "8", image: "", title: "الخريطة", gamesCount: 120 },
      {id: "9",  image: "", title: "منظمات", gamesCount: 120 },
      {id: "10",  image: "", title: "نشيد وطني", gamesCount: 120 },
      {id: "11",  image: "", title: "شعار دول", gamesCount: 120 },
      {id: "12",  image: "", title: "رموز دول", gamesCount: 120 },

    ],
  },
  {
    title: "فن عربي",
    items: [
      { image: "/images/products/p7.jpg", title: "الزير سالم  ", gamesCount: 120 },
      {id: "13",  image: "/images/products/p8.png", title: "باب الحارة", gamesCount: 120 },
      {id: "14",  image: "/images/products/p9.png", title: "  عدنان ولينا", gamesCount: 120 },
      {id: "15",  image: "", title: "طاش ما طاش  ", gamesCount: 120 },
      {id: "16",  image: "", title: "  حيالة", gamesCount: 120 },
      {id: "17",  image: "", title: "درب الزلق  ", gamesCount: 120 },
    ],
  },
  {
    title: "رياضة",
    items: [
      {id: "18",  image: "/images/products/p11 - Copy.png", title: "كأس العالم", gamesCount: 120 },
      {id: "19", image: "/images/products/p12.png", title: "الدوري الأوروبي", gamesCount: 120 },
      {id: "20",  image: "", title: "الدوري الاسباني  ", gamesCount: 120 },
      {id: "21",  image: "", title: "الدوري الايطالي  ", gamesCount: 120 },  
      {id: "22", image: "", title: "الدوري الفرنسي  ", gamesCount: 120 },
      {id: "23",  image: "", title: "من اللاعب  ", gamesCount: 120 },
    ],
  },
];

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories,loading,error} = useSelector((state: RootState) => state.category
  ); 
     const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() =>{
dispatch(getCategories())
 dispatch(getGamePackages())
 


    },[])
    console.log(categories)
  return (
    <>
     {/* Header with Menu Icon */}
      <Header />
      <div className="px-12">

        <HeroSection categories={categories} loading={loading} error={error}/>
        
     {Array.isArray(categories?.data) && categories.data.map((cat, index) => (
  <ProductSection 
    selectedIds={selectedIds}
    setSelectedIds={setSelectedIds}
    key={index}
    title={cat.name}
    items={cat.games}
  />
))}

 {/* للعرض */}
      <div className="mt-4 text-sm text-gray-700">
        المختارة: {selectedIds.join(", ") || "لا يوجد"}
      </div>
      <GameSetup selectedIds={selectedIds} />
       {/* Footer */}
      <Footer  />
    </div>
    </>
  
  );
};

export default HomePage;
