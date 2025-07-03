import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Or use Heroicons or your own SVGs

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <header className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-md">
  <div className="max-w-6xl mx-auto flex flex-row-reverse justify-between items-center">

    {/* Right: شراء | إهداء لعبة */}
    <nav className="hidden md:flex items-center text-black font-semibold gap-6">
      <Link to="/auth">إنشاء حساب | دخول</Link>
    </nav>

    {/* Center: Logo */}
    <div className="flex-grow text-center">
      <Link to="/home">
        <img src="/images/logo.png" className="mx-auto h-12" alt="Logo" />
      </Link>
    </div>

    {/* Left: إنشاء حساب | دخول */}
   
 <nav className="hidden md:flex items-center text-black font-semibold gap-6">
      <Link to="/game">شراء | إهداء لعبة</Link>
    </nav>
    {/* Mobile Menu Icon */}
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown */}
  {isOpen && (
    <div className="md:hidden flex flex-col items-center mt-4 space-y-3 text-black font-semibold">
      <Link to="/game" onClick={() => setIsOpen(false)}>شراء | إهداء لعبة</Link>
      <Link to="/auth" onClick={() => setIsOpen(false)}>إنشاء حساب | دخول</Link>
    </div>
  )}
</header>

  );
};

export default Header;
