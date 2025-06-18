import  { useState } from "react";
import { Link } from "react-router-dom";


const GamePurchasePage = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "gift">("buy");
  const [selectedCoins, setSelectedCoins] = useState<number | null>(30);
  const [discountCode, setDiscountCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const coinsOptions = [
    { value: 1, price: 10 },
    { value: 25, price: 30 },
    { value: 50, price: 50 },
    { value: 90, price: 100 },
    { value: 30, price: 150 },
    { value: 430, price: 150 },
    { value: 70, price: 150 },
    { value: 20, price: 150 },


  ];

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-0 sm:py-2">
       <div className="max-w-md mx-auto  p-6 rounded-md shadow-md text-right">
      <h2 className="text-2xl text-[#085E9C] font-bold text-center mb-4">شراء أو إهداء اللعب</h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-2 w-full p-1 max-w-xs border border-gray-300  overflow-hidden">
          <button
            onClick={() => setActiveTab("buy")}
            className={`px-4 py-2 text-sm ${
              activeTab === "buy" ? "bg-[#085E9C] text-white" : "text-gray-700"
            }`}
          >            شراء

          </button>
          <button
            onClick={() => setActiveTab("gift")}
            className={`px-4 py-2 text-sm ${
              activeTab === "gift" ? "bg-[#085E9C] text-white" : "text-gray-700"
            }`}
          >
                        إهداء

          </button>
        </div>
      </div>

      {/* Coins selection */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {coinsOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedCoins(option.value)}
            className={`border text-sm rounded py-2 ${
              selectedCoins === option.value
                ? "bg-yellow-400 text-[#085E9C] font-bold"
                : "text-[#fff] bg-[#085E9C]"
            }`}
          >
         <div className={` pb-2 mx-2 border-b-2  ${
              selectedCoins === option.value
                ? "border-[#085E9C] "
                : "border-[#FFC629] "
            }`}>  {option.value} <br/> لعبة </div> <div className="">ريال {option.price}</div>
          </button>
        ))}
      </div>

      {/* Discount Code */}
      
      <div className="mb-4 space-y-2">
         <div className="grid grid-cols-2 gap-3">
         <input
          type="text"
          placeholder="كود الخصم"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none"
        />
        <button className="w-full border text-[#085E9C]  border-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white  transition">
          تطبيق
        </button>
       </div>
       
        <p className="text-sm   border px-3 py-2 rounded border-[#085E9C]  text-gray-600 text-center">
          ستدفع الآن {selectedCoins ?? 0} ﷼
        </p>
      </div>

      {/* Additional info for gifting */}
      {activeTab === "gift" && (
        <div className="space-y-4 mb-4">
          <p className="text-md text-gray-600">أدخل البريد الإلكتروني أو رقم الجوال الخاص بالمستلم</p>
          <input
            type="tel"
            placeholder="رقم الجوال"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none"
          />
        </div>
      )}

      {/* Payment Button */}
      <button className="w-full border text-[#085E9C] border-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white transition">
                  <Link to="/payment"> توجه لصفحة الدفع</Link>
        
       
      </button>
    </div>
    </div>
   
  );
};

export default GamePurchasePage;
