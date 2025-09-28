import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User2, Gamepad2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { logOut } from "../store/auth/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await dispatch(logOut());
    setIsLoggingOut(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-row-reverse justify-between items-center">
        {/* Right: تسجيل الدخول / الخروج */}
        <nav className="hidden md:flex items-center text-black font-medium gap-6 text-lg">
          {user ? (
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 px-5 py-2 border border-gray-600 hover:rounded-2xl text-black rounded-md font-semibold transition-all duration-200">
                <Link to="/active-game" className="flex items-center gap-2">
                  العابي <Gamepad2 size={20} />
                </Link>
              </button>

              <Link to="/profile" className="flex items-center gap-2">
                <span>{user.first_name ?? user.email}</span>
                <User2 size={24} className="cursor-pointer" />
              </Link>

              <button
                onClick={handleLogout}
                className="cursor-pointer"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج"}
              </button>
            </div>
          ) : (
            <Link to="/auth">إنشاء حساب | دخول</Link>
          )}
        </nav>

        {/* Center: Logo */}
        <div className="flex-grow text-center">
          <Link to="/home">
            <img src="/images/logo.png" className="mx-auto h-12" alt="Logo" />
          </Link>
        </div>

        {/* زر الألعاب (يظهر بس لو في user) */}
        {user && (
          <button className="mr-4 flex items-center gap-2 px-5 py-2 border border-gray-600 text-black rounded-md font-semibold transition-all duration-200">
            {user.is_first_game ? (
              <span>لعبه مجانيه</span>
            ) : (
              <span>لديك {user.purchased_games} لعبه</span>
            )}
          </button>
        )}

        {/* Left: شراء | إهداء لعبة */}
        <nav className="hidden md:flex items-center text-black font-medium gap-6 text-lg">
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
          <Link to="/game" onClick={() => setIsOpen(false)}>
            شراء | إهداء لعبة
          </Link>
          {user ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج"}
              </button>
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2 text-lg"
                onClick={() => setIsOpen(false)}
              >
                <span>{user.first_name ?? user.email}</span>
                <User2 size={24} className="cursor-pointer" />
              </Link>
            </div>
          ) : (
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              إنشاء حساب | دخول
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
