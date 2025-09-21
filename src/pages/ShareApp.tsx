import React from "react";
import { MessageCircle, Facebook, X, Star } from "lucide-react";

const ShareApp: React.FC = () => {
  const shareData = {
    title: "Jawib App",
    text: "جرب تطبيق Jawib واستمتع بالألعاب التفاعلية 🎮",
    url: "https://play.google.com/store/apps/details?id=com.jawib",
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
    // رابط التقييم، هنا مثال على Google Play، ممكن تضيف Apple Store حسب النظام
    window.open(
      "https://play.google.com/store/apps/details?id=com.jawib",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      {/* بطاقة المشاركة */}
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-[#085E9C] text-3xl font-bold mb-6">شارك التطبيق</h2>

        {/* زر المشاركة الرئيسي */}
        <button
          onClick={handleShare}
          className="bg-[#085E9C] text-white px-8 py-3 rounded-xl text-xl font-bold hover:bg-blue-800 transition-shadow shadow-md hover:shadow-lg mb-4 w-full flex items-center justify-center gap-2"
        >
          شارك الآن
        </button>

        {/* زر التقييم */}
        <button
          onClick={handleRate}
          className="bg-yellow-400 text-white px-8 py-3 rounded-xl text-xl font-bold hover:bg-yellow-500 transition-shadow shadow-md hover:shadow-lg w-full flex items-center justify-center gap-2"
        >
          قيمنا
          <Star size={24} className="text-white" />
        </button>

        {/* روابط بديلة بأيقونات */}
        <div className="mt-8 text-center w-full">
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
