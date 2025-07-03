
const ContactUs = () => {
  return (
    <div className="min-h-screen font-Tajawal max-w-3xl mx-auto  px-4 py-12 sm:py-6 sm:px-2">
      <h2 className="text-[#085E9C] text-2xl font-bold text-center mb-10">
        اتصل بنا
      </h2>

      <div className="w-full space-y-4">
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

        <div className="flex w-full items-center justify-between ">
         <div className="border  w-[35%]  border-gray-200 rounded px-6 py-6 space-y-6 text-right text-[#085E9C]  bg-gray-50 shadow-sm">
                   <div className="flex items-center gap-3">
                    <img src="/images/3g.png" className="w-6 h-6" alt="" />
         
                     <span className="text-lg">المملكة العربية السعودية</span>
                   </div>
                   <div className="flex items-center gap-3">
                    <img src="/images/1g.png" className="w-6 h-6" alt="" />
                     <span className="text-sm">info@jawb.com</span>
                   </div>
                   <div className="flex items-center gap-3">
                    <img src="/images/2g.png" className="w-6 h-6" alt="" />
         
                     <span className="text-sm">966505960258+</span>
                   </div>
                 </div>
<div className=" w-[35%]"></div>
          {/* الرسائل والتنبيهات */}
          <div className="flex-1 w-[30%] flex flex-col gap-4 justify-center">
            <p className="text-[#B91C1C] text-center text-lg">
كلمة المرور غير متطابقة             </p>

            <button className="border-2 text-lg border-[#085E9C] text-[#085E9C] px-8 py-2 rounded hover:bg-blue-50 transition">
              إرسال
            </button>

            <p className="text-[#307F50] px-4 py-2 border shadow text-lg text-center">
شكراً، تم إرسال رسالتك بنجاح            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
