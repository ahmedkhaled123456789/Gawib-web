import React from "react";
import { MessageCircle, Facebook, X, Star } from "lucide-react";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";

const ShareApp: React.FC = () => {
  const shareData = {
    title: "Jawib App",
    text: "جرب تطبيق Jawib واستمتع بالألعاب التفاعلية 🎮\nتحميل التطبيق:",
    url: `Google Play: https://play.google.com/store/apps/details?id=com.jawib\nApp Store: https://apps.apple.com/app/jawib/id1234567890`,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("تمت المشاركة بنجاح");
      } catch (err) {
        console.error("فشل في المشاركة:", err);
      }
    } else {
      alert("ميزة المشاركة غير مدعومة على هذا المتصفح 🚫");
    }
  };

  const handleRate = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const url = isIOS
      ? "https://apps.apple.com/app/jawib/id1234567890"
      : "https://play.google.com/store/apps/details?id=com.jawib";
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full flex flex-col items-center">
        <h2 className="text-[#085E9C] text-3xl font-bold mb-6">شارك التطبيق</h2>


        {/* زر التقييم */}
        <button
          onClick={handleRate}
          className="bg-yellow-400 text-white px-8 py-3 rounded-xl text-xl font-bold hover:bg-yellow-500 transition-shadow shadow-md hover:shadow-lg w-full flex items-center justify-center gap-2 mb-6"
        >
          قيمنا
          <Star size={24} className="text-white" />
        </button>

        {/* أزرار التحميل */}
        <div className="flex gap-4 mb-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.jawib"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
          >
            <FaGooglePlay size={24} className="text-green-700" />
            Google Play
          </a>
          <a
            href="https://apps.apple.com/app/jawib/id1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
          >
            <FaAppStore size={24} className="text-black" />
            App Store
          </a>
        </div>

        {/* روابط بديلة للمشاركة */}
        <div className="mt-4 text-center w-full">
          <p className="text-gray-500 mb-4">أو شارك عبر:</p>
          <div className="flex gap-6 justify-center">
            {/* واتساب */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${shareData.text} ${shareData.url}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full hover:bg-green-200 transition-shadow shadow-md hover:shadow-lg"
            >
              <MessageCircle size={32} className="text-green-600" />
            </a>

            {/* فيسبوك */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareData.url
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full hover:bg-blue-200 transition-shadow shadow-md hover:shadow-lg"
            >
              <Facebook size={32} className="text-blue-600" />
            </a>

            {/* تويتر */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareData.text
              )}&url=${encodeURIComponent(shareData.url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full hover:bg-sky-200 transition-shadow shadow-md hover:shadow-lg"
            >
              <X size={32} className="text-sky-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareApp;
