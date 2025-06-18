import { AlignJustify } from 'lucide-react';
import { useState } from 'react';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-4">
        <AlignJustify  size={24} />
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 bg-white border rounded shadow p-4 z-50 w-60 text-right space-y-2">
          <p className="cursor-pointer">اقتراحاتك</p>
          <p className="cursor-pointer">قيمنا</p>
          <p className="cursor-pointer">اتصل بنا</p>
          <p className="cursor-pointer">عن جاوب</p>
          <p className="cursor-pointer">عدنان ولينا</p>
          <p className="cursor-pointer">شارك التطبيق</p>
          <p className="cursor-pointer">شروط الاستخدام</p>
          <p className="cursor-pointer">التواصل الاجتماعي</p>
          <p className="cursor-pointer">شراء / إهداء لعبة</p>
          <p className="cursor-pointer">إنشاء حساب / دخول</p>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
