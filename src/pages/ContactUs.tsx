import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen max-w-3xl mx-auto font-sans px-4 py-12 sm:py-6 sm:px-2">
      <h2 className="text-[#085E9C] text-2xl font-bold text-center mb-10">
        اتصل بنا
      </h2>

      <div className="w-full space-y-10">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="الاسم الأول"
              className="border border-gray-300 rounded px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
            />
            <input
              type="text"
              placeholder="اسم العائلة"
              className="border border-gray-300 rounded px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="border border-gray-300 rounded px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
            />
          </div>

          <textarea
            placeholder="اكتب نص الرسالة"
            className="w-full h-24 border border-gray-300 rounded px-4 py-2 text-right resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          ></textarea>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          <div className="flex-1 border border-gray-200 rounded px-6 py-6 space-y-6 text-right text-[#085E9C] text-base bg-gray-50 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <span>المملكة العربية السعودية</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} />
              <span>info@jawb.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} />
              <span>+966505960258</span>
            </div>
          </div>

          {/* الرسائل والتنبيهات */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <p className="text-red-600 text-center text-sm">
              كلمة المرور غير متطابقة
            </p>

            <button className="border border-[#085E9C] text-[#085E9C] px-8 py-2 rounded hover:bg-blue-50 transition">
              إرسال
            </button>

            <p className="text-green-600 px-8 py-2 border shadow text-sm text-center">
              تم إرسال رسالتك بنجاح
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
