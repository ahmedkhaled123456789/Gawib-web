const AboutJaweb = () => {
  return (
    <div className="min-h-screen font-Tajawal flex items-center justify-center bg-white  p-20">
      <div className="text-center space-y-6">
        {/* العنوان */}
        <h2 className="text-[#085E9C] text-4xl font-bold">عن جاوب</h2>

        {/* مربع النص */}
        <div className="border rounded-md p-6 font-medium text-gray-800  text-right text-[30px]">
          لغرض جودة الخدمة وسرعة الإنجاز فإننا من الممكن مشاركة معلوماتك الشخصية وبيانات حجزك مع جميع فروعنا وخدمة العملاء ومع شركائنا (المضيفين) للتنسيق والتواصل معك إن دعت الحاجة لذلك. من الممكن أيضًا مشاركة بيانات التواصل الخاصة بك عبر البريد الإلكتروني وجوال مع جهات أخرى جديرة بالثقة مثل الفنادق. ومع ذلك فإننا نضمن لك في مكان عدم مشاركة معلوماتك الشخصية لأي جهات ترويجية لغرض التسويق إلا بعد أخذ الموافقة المسبقة منك. أيضًا يحق لنا طلب مشاركة معلوماتك مع طرف ثالث إن أمكن، في حال الحاجة ومن جهات مثل الجهات الأمنية، قد نضطر إلى مشاركة بياناتك مثل بيانات الحجز والتأشيرة وساعات الوصول والمغادرة والمبالغ التي تمت بوسائل الدفع الإلكتروني في منصاتنا. بمجرد تقديم معلوماتك الشخصية واستخدامك لمنصتنا (الموقع والتطبيقات) من عمل حجوزات وإرسال مدفوعات فإنك توافق على مشاركة تلك البيانات في نظام شموس الأمني.
        </div>

        {/* زر الإغلاق */}
        <button className="border-2 text-2xl font-bold w-[40%] border-[#085E9C] text-[#085E9C] px-8 py-2 rounded hover:bg-blue-50 transition">
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default AboutJaweb;
