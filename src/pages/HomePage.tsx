import Footer from "../components/Footer";
import GameSetup from "../components/GameSetup";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/products/ProductSection";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getCategories } from "../store/categoriesSlice";
import { getGames } from "../store/gameSlice";
import { getGamePackages } from "../store/GamePackagesSlice";
import { getQuestions } from "../store/questionsSlice";
const products = [
  {
    title: "دول وجغرافيا",
    items: [
      { image: "/images/products/p6.png", title: "لغات  ", gamesCount: 120 },
      {image: "/images/products/p5.png", title: "أعلام", gamesCount: 120 },
      { image: "/images/products/p4.png", title: "عواصم", gamesCount: 120 },
      { image: "/images/products/p3.png", title: "معالم", gamesCount: 120 },
      { image: "/images/products/p2.png", title: "عملات", gamesCount: 120 },
      { image: "/images/products/p1.png", title: "دول وعواصم", gamesCount: 120 },
      { image: "", title: "فتح خط دولي  ", gamesCount: 120 },
      {image: "", title: "الخريطة", gamesCount: 120 },
      { image: "", title: "منظمات", gamesCount: 120 },
      { image: "", title: "نشيد وطني", gamesCount: 120 },
      { image: "", title: "شعار دول", gamesCount: 120 },
      { image: "", title: "رموز دول", gamesCount: 120 },

    ],
  },
  {
    title: "فن عربي",
    items: [
      { image: "/images/products/p7.jpg", title: "الزير سالم  ", gamesCount: 120 },
      { image: "/images/products/p8.png", title: "باب الحارة", gamesCount: 120 },
      { image: "/images/products/p9.png", title: "  عدنان ولينا", gamesCount: 120 },
      { image: "", title: "طاش ما طاش  ", gamesCount: 120 },
      { image: "", title: "  حيالة", gamesCount: 120 },
      { image: "", title: "درب الزلق  ", gamesCount: 120 },
    ],
  },
  {
    title: "رياضة",
    items: [
      { image: "/images/products/p11 - Copy.png", title: "كأس العالم", gamesCount: 120 },
      {image: "/images/products/p12.png", title: "الدوري الأوروبي", gamesCount: 120 },
      { image: "", title: "الدوري الاسباني  ", gamesCount: 120 },
      { image: "", title: "الدوري الايطالي  ", gamesCount: 120 },  
      {image: "", title: "الدوري الفرنسي  ", gamesCount: 120 },
      { image: "", title: "من اللاعب  ", gamesCount: 120 },
    ],
  },
];

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
    const {categories } = useSelector((state: RootState) => state.category);
  
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

        <HeroSection/>
        
      {products.map((cat, index) => (
        <ProductSection key={index} title={cat.title} items={cat.items} />
      ))}

      <GameSetup />
       {/* Footer */}
      <Footer />
    </div>
    </>
  
  );
};

export default HomePage;
