import { Link } from "react-router-dom";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const token = localStorage.getItem("accessToken");

  return (
    <div
      className={`fixed top-12 right-0 font-Tajawal   py-4 rounded-tl-[20px] w-64 border-[2px] bg-[#fff] border-[#085E9C]  shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute top-0 left-0 ">
        <button onClick={onClose}>
          <img src="/images/g4.png" className="w-8 h-8" alt="" />
        </button>
      </div>
      <ul className="flex flex-col text-[#085E9C] text-2xl  items-start px-6 space-y-4  text-right font-bold ">
        <Link to="/share-app">
          <li>قيمنا</li>
        </Link>
        <Link to="/contact-us">
          <li>اتصل بنا</li>
        </Link>
        <Link to="/about">
          <li>عن جاوب</li>
        </Link>
        <Link to="/share-app">
          <li>شارك التطبيق</li>
        </Link>
        <Link to="/rules">
          <li>شروط الاستخدام</li>
        </Link>
        <Link to="/SocialMedia">
          <li>التواصل الاجتماعي</li>
        </Link>
        <Link to="/game">
          <li>شراء / إهداء لعبة</li>
        </Link>
        {token ? (
          <Link to="/profile">
            <li>الملف الشخصي</li>
          </Link>
        ) : (
          <Link to="/auth">
            <li>إنشاء حساب / دخول</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default SideMenu;
