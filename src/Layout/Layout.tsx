import { useState } from "react";
import Routers from "../Routes/Routers";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header"; // ✅ استيراد الـ Header
import { useLocation } from "react-router-dom";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // ✅ الصفحات اللي مش عايز يظهر فيها الـ Header
  const hideHeaderRoutes = ["/auth"];

  return (
    <>
      {/* ✅ الشرط بتاع الـ Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      {location.pathname.startsWith("/home") ||
      location.pathname.startsWith("/Congratulations") ? (
        <> </>
      ) : (
        <>
          <div className="fixed top-12 right-4 z-50 ">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-3xl font-bold text-[#085E9C]"
            >
              ☰
            </button>
          </div>

          {/* Side Menu */}
          <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
      )}

      {/* Main Content */}
      <div>
        <Routers />
      </div>
    </>
  );
};

export default Layout;
