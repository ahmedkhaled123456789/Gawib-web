import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-12 right-0  py-4 rounded-tl-[20px] w-64 border-[2px] bg-[#fff] border-[#085E9C] shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="absolute top-0 left-0 ">
        <button onClick={onClose} className="text-xl border-[5px] flex items-center justify-center p-1  border-[#085E9C] rounded-full w-8 h-8 text-[#085E9C] font-bold"><X size={20} /></button>
      </div>
      <ul className="flex flex-col   items-start px-6 space-y-4  text-right font-medium text-gray-800">
      <Link to="/auth"> <li>قيمنا</li></Link> 
      <Link to="/ContactUs"> <li>اتصل بنا</li></Link>  
       <Link to="/about"><li>عن جاوب</li></Link>  
       <Link to="/auth">  <li>شارك التطبيق</li></Link>
       <Link to="/rules"> <li>شروط الاستخدام</li></Link> 
       <Link to="/SocialMedia"> <li>التواصل الاجتماعي</li></Link> 
      <Link to="/game"> <li>شراء / إهداء لعبة</li></Link>  
       <Link to="/auth"> <li>إنشاء حساب / دخول</li></Link> 
      </ul>
    </div>
  );
};

export default SideMenu;
