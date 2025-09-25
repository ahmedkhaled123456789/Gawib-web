import { Link } from "react-router-dom";
import {  Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-200/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
        {/* Logo with enhanced styling */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="relative w-28 h-28 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Enhanced 404 number with glass effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-full"></div>
          <h1 className="relative text-9xl md:text-[12rem] font-black bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
            404
          </h1>
        </div>

        {/* Enhanced buttons with glassmorphism */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/home"
            className="group relative px-8 py-4 bg-[#085E9C]/90 backdrop-blur-sm text-white rounded-2xl shadow-xl border border-[#085E9C]/20 hover:bg-[#064a7a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold">الصفحة الرئيسية</span>
            <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl shadow-xl border border-white/20 hover:bg-white/90 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold">رجوع للخلف</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
