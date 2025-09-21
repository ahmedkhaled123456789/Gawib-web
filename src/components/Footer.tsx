import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getSocialLinks } from "../store/SocialLinksSlice";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu"; // ✅ استيراد الـ SideMenu

interface FooterProps {
  selectedIds?: string[];
  allGames?: { id: string; name: string; image: string }[];
}

const Footer: React.FC<FooterProps> = ({ selectedIds, allGames }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { socialLinks } = useSelector((state: RootState) => state.social);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ state هنا جوه Footer

  useEffect(() => {
    dispatch(getSocialLinks());
  }, [dispatch]);

  const selectedGames =
    allGames?.filter((game) => selectedIds?.includes(game.id)) || [];

  const socialOnly = socialLinks?.filter(
    (item: { name: string }) =>
      !item.name?.toLowerCase().includes("contact_email") &&
      !item.name?.toLowerCase().includes("phone") &&
      !item.name?.toLowerCase().includes("address")
  );

  return (
    <>
      {/* ✅ سايد بار */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <footer className="fixed bottom-0 left-0 w-full bg-[#085E9C] flex justify-between items-center px-3 sm:px-6 py-2 text-white">
        {/* الجزء الشمال */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            className="text-xl sm:text-3xl font-bold"
            onClick={() => setIsMenuOpen(true)} // ✅ فتح السايد بار
          >
            ☰
          </button>
          <Link to="/home">
            <img
              src="/images/footer/f5.png"
              alt="Home"
              className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white"
            />
          </Link>
          <Link to="/contact-us">
            <img
              src="/images/footer/f4.png"
              alt="Contact"
              className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white"
            />
          </Link>
        </div>

        {/* صور الألعاب المختارة */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto max-w-[200px] sm:max-w-md md:max-w-xl px-2 scroll-smooth custom-scrollbar">
          {selectedGames.length > 0 ? (
            selectedGames.map((game) => (
              <img
                key={game.id}
                src={game.image}
                alt={game.name}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded"
              />
            ))
          ) : (
            <span className="text-[10px] sm:text-sm">لا يوجد ألعاب مختارة</span>
          )}
        </div>

        {/* الجزء اليمين - روابط السوشيال */}
        <div className="flex items-center gap-3 sm:gap-6">
          {socialOnly?.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <img
                src={`https://test.jawib.net/storage/${item.icon}`}
                alt={item.name}
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
              />
            </a>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
