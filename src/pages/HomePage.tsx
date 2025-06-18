import Footer from "../components/Footer";
import GameSetup from "../components/GameSetup";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/products/ProductSection";

const products = [
  {
    title: "دول وجغرافيا",
    items: [
      { image: "/public/images/products/p1.png", title: "دول وعواصم", gamesCount: 120 },
      {image: "/public/images/products/p2.png", title: "عملات", gamesCount: 120 },
      { image: "/public/images/products/p3.png", title: "معالم", gamesCount: 120 },
      { image: "/public/images/products/p4.png", title: "معالم", gamesCount: 120 },
      { image: "/public/images/products/p5.png", title: "معالم", gamesCount: 120 },
      { image: "/public/images/products/p6.png", title: "معالم", gamesCount: 120 },
      { image: "/public/images/products/p1.png", title: "دول وعواصم", gamesCount: 120 },
      {image: "/public/images/products/p2.png", title: "عملات", gamesCount: 120 },
      { image: "/public/images/products/p3.png", title: "معالم", gamesCount: 120 },
      { image: "/public/images/products/p4.png", title: "معالم", gamesCount: 120 },
      { image: "/public/images/products/p5.png", title: "معالم", gamesCount: 120 },
      { image: "/public/images/products/p6.png", title: "معالم", gamesCount: 120 },

    ],
  },
  {
    title: "فن عربي",
    items: [
      { image: "/public/images/products/p7.jpg", title: "الزعيم عادل", gamesCount: 120 },
      { image: "/public/images/products/p8.png", title: "باب الحارة", gamesCount: 120 },
      { image: "/public/images/products/p9.png", title: "الزعيم عادل", gamesCount: 120 },
      { image: "/public/images/products/p1.png", title: "باب الحارة", gamesCount: 120 },
      { image: "/public/images/products/p3.png", title: "الزعيم عادل", gamesCount: 120 },
      { image: "/public/images/products/p2.png", title: "باب الحارة", gamesCount: 120 },
    ],
  },
  {
    title: "رياضة",
    items: [
      { image: "/public/images/products/p11 - Copy.png", title: "كأس العالم", gamesCount: 120 },
      {image: "/public/images/products/p12.png", title: "الدوري الأوروبي", gamesCount: 120 },
      { image: "/public/images/products/p1.png", title: "كأس العالم", gamesCount: 120 },
      { image: "/public/images/products/p7.png", title: "الدوري الأوروبي", gamesCount: 120 },  
      {image: "/public/images/products/p2.png", title: "كأس العالم", gamesCount: 120 },
      { image: "/public/images/products/p6.png", title: "الدوري الأوروبي", gamesCount: 120 },
    ],
  },
];

const HomePage = () => {
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
