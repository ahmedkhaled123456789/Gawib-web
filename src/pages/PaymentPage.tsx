import React, { useState } from "react";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
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
      className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6"
    >
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-md shadow-md text-right">
        <h2 className="text-2xl font-bold text-center text-[#1D4ED8] mb-6">
          ادفع الآن
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="رقم البطاقة"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <input
            type="text"
            placeholder="تاريخ الإنتهاء MM / YY"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-3 items-center">
            <input
              type="text"
              placeholder="رمز CVV"
              className="col-span-2 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
<div className="text-center border px-3 py-2 rounded border-gray-300 text-base sm:text-lg font-bold text-[#085E9C]">
              ﷼ 130
            </div>
          </div>

          {hasError && (
            <p className="text-red-600 text-sm">
              بيانات بطاقة الدفع غير صحيحة
            </p>
          )}

          <button
            type="submit"
            className="w-full border border-[#085E9C] text-[#085E9C] px-3 py-2 rounded hover:bg-[#085E9C] hover:text-white transition"
          >
            ادفع الآن
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
