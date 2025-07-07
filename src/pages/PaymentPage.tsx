import React, { useState } from "react";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("  رقم البطاقة                            0000 0000 0000 0000");
  const [expiryDate, setExpiryDate] = useState("تاريخ الإنتهاء                                                  MM / YY");
  const [cvv, setCvv] = useState("رمز CVV");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.length < 16 || cvv.length < 3 || !expiryDate) {
      setHasError(true);
    } else {
      setHasError(false);
      alert("تم تنفيذ الدفع بنجاح ✅");
    }
  };

  return (
    <div
      dir="rtl"
      className="flex items-center justify-center gap-40  min-h-screen py-12 px-4 sm:px-6"
    >
      
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-md shadow-md text-right">
        <h2 className="text-2xl font-bold text-center text-[#085E9C] mb-6">
          ادفع الآن
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
             className="w-full border px-3 py-2 rounded focus:outline-none "
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <input
            type="date"
             className="w-full border px-3 py-2 rounded focus:outline-none "
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-3 items-center">
            <input
              type="number"
               className="col-span-2 border px-3 py-2 rounded focus:outline-none "
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
<div className="flex items-center justify-center gap-4  border px-3 py-2 rounded border-gray-300 text-base sm:text-lg font-bold text-[#085E9C]">
            <span>130</span>  <img src="/public/images/Saudi_Riyal_Symbol-1.png" className="w-5 h-5 filter-blue  " alt="" /> 
            </div>
          </div>

          {hasError && (
            <p className="text-red-600 text-sm">
              بيانات بطاقة الدفع غير صحيحة
            </p>
          )}

          <button
            type="submit"
            className="w-full font-bold border-2  border-[#085E9C] text-[#085E9C] px-3 py-2 rounded hover:bg-[#085E9C] hover:text-white transition"
          >
            ادفع الآن
          </button>
        </form>
      </div>
      
      <div>
        <div>
          <img src="/public/images/payment/pay1.png" className="w-28 h-28" alt="" />
        </div>
       <div>
          <img src="/public/images/payment/pay2.png" className="w-28 h-28" alt="" />
        </div>
 <div>
          <img src="/public/images/payment/pay3.png" className="w-28 h-28" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
