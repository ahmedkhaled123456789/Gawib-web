import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Or use Heroicons or your own SVGs

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo center */}
        <div className="flex-grow text-center order-2 md:order-2">
          <Link to="/home">
            <img src="/images/logo.png" className="mx-auto h-12" alt="Logo" />
          </Link>
        </div>

        {/* Menu (desktop) */}
        <nav className="hidden md:flex items-center justify-between text-black font-semibold gap-6 order-1 md:order-1">
          <Link to="/auth">إنشاء حساب | دخول</Link>
        </nav>

        <nav className="hidden md:flex items-center justify-between text-black font-semibold gap-6 order-3 md:order-3">
          <Link to="/game">شراء | إهداء لعبة</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden order-1">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-3 text-black font-semibold">
          <Link to="/auth" onClick={() => setIsOpen(false)}>إنشاء حساب | دخول</Link>
          <Link to="/game" onClick={() => setIsOpen(false)}>شراء | إهداء لعبة</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
