import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const id = params.get("id");
  const message = params.get("message");

  return (
    <div className="flex items-center justify-center min-h-screen p-12 sm:px-2 sm:py-2">
      <div className="max-w-md mx-auto font-Tajawal mt-12">
        <div className="flex flex-col gap-6">
          
          {/* عرض الرسالة إذا موجودة */}
          {message && (
            <p className="text-center px-6 py-4 shadow border rounded border-gray-200 text-lg">
              {decodeURIComponent(message)}
            </p>
          )}

          {/* رسالة نجاح/فشل */}
          <p className="text-center px-8 py-8 shadow border rounded border-gray-200 text-lg text-green-600">
            ✅ شكراً، المعاملة تمت بنجاح
          </p>

          {/* عرض رقم الطلب إذا موجود */}
          {id && (
            <p className="text-center text-sm">
              رقم الطلب: <span className="font-bold">{id}</span>
            </p>
          )}

          {/* زر العودة للرئيسية */}
          <button className="border border-[#085E9C] text-[#085E9C] px-8 py-2 rounded hover:bg-blue-50 transition">
            <Link to={"/home"}>العودة للرئيسية</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
