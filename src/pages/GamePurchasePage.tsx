import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { getGamePackages } from "../store/GamePackagesSlice";
import { applyDiscount, clearDiscount } from "../store/DiscountSlice";
import { createPayment } from "../store/paymentSlice";
import { createFreePayment } from "../store/freePaymentSlic";
import type { AppDispatch, RootState } from "../store";

const GamePurchasePage = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "gift">("buy");
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { gamePackages } = useSelector((state: RootState) => state.gamePackage);
  const { discount, loading: discountLoading } = useSelector(
    (state: RootState) => state.discount
  );
  const { loading: paymentLoading } = useSelector(
    (state: RootState) => state.payment
  );

  useEffect(() => {
    dispatch(getGamePackages());
  }, [dispatch]);

  const handleApplyDiscount = () => {
    if (!selectedPackage) {
      toast.error("اختر باقة أولاً");
      return;
    }
    if (!discountCode) {
      toast.error("ادخل كود الخصم");
      return;
    }

    dispatch(
      applyDiscount({ package_id: selectedPackage.id, code: discountCode })
    )
      .unwrap()
      .then((res) => {
        toast.success(res.message || "تم تطبيق الخصم");
      })
      .catch((err) => {
        toast.error(err?.message || "حدث خطأ في تطبيق الخصم");
      });
  };

  const displayPrice = discount?.final_amount ?? selectedPackage?.price ?? 0;

  const handlePayment = () => {
    if (!selectedPackage) {
      toast.error("اختر باقة أولاً");
      return;
    }

    // شرط الدفع المجاني لو الخصم 100%
    if (discount?.final_amount === 0) {
      const freePaymentData = {
        package_id: selectedPackage.id,
        receiver_email: activeTab === "gift" ? email || undefined : undefined,
        receiver_phone:
          activeTab === "gift" && phone
            ? `+${phone.replace(/\D/g, "")}`
            : undefined,
      };

      dispatch(createFreePayment(freePaymentData))
        .unwrap()
        .then((res: any) => {
          toast.success(res.message || "تمت عملية الدفع المجاني بنجاح");
        })
        .catch((err: any) => {
          toast.error(err || "حدث خطأ أثناء الدفع المجاني");
        });

      return; // الخروج من الدالة
    }

    // الدفع العادي
    const paymentData = {
      package_id: selectedPackage.id,
      amount: displayPrice,
      receiver_email: activeTab === "gift" ? email || undefined : undefined,
      receiver_phone:
        activeTab === "gift" && phone
          ? `+${phone.replace(/\D/g, "")}`
          : undefined,
    };

    dispatch(createPayment(paymentData))
      .unwrap()
      .then((res: any) => {
        toast.success(res.message || "تمت عملية الدفع بنجاح");
        if (res.payment_url) {
          window.open(res.payment_url, "_blank");
        }
      })
      .catch((err: any) => {
        toast.error(err || "حدث خطأ أثناء الدفع");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-0 sm:py-2">
      <div className="max-w-md mx-auto p-6 rounded-md shadow-md text-right">
        <h2 className="text-2xl text-[#085E9C] font-bold text-center mb-4">
          شراء أو إهداء اللعب
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 w-full p-1 max-w-xs border border-gray-300 overflow-hidden">
            <button
              onClick={() => setActiveTab("buy")}
              className={`px-4 py-2 text-xl ${
                activeTab === "buy"
                  ? "bg-[#085E9C] text-white"
                  : "text-gray-700"
              }`}
            >
              شراء
            </button>
            <button
              onClick={() => setActiveTab("gift")}
              className={`px-4 py-2 text-xl ${
                activeTab === "gift"
                  ? "bg-[#085E9C] text-white"
                  : "text-gray-700"
              }`}
            >
              إهداء
            </button>
          </div>
        </div>

        {/* Coins selection */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {gamePackages?.length > 0 ? (
            gamePackages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => {
                  setSelectedPackage(pkg);
                  dispatch(clearDiscount());
                }}
                className={`border text-xl rounded py-2 ${
                  selectedPackage?.id === pkg.id
                    ? "bg-yellow-400 text-[#085E9C] font-bold"
                    : "text-[#fff] bg-[#085E9C]"
                }`}
              >
                <div
                  className={`pb-2 mx-2 border-b-2 ${
                    selectedPackage?.id === pkg.id
                      ? "border-[#085E9C]"
                      : "border-[#FFC629]"
                  }`}
                >
                  {pkg.games_count} <br /> العاب
                </div>
                <div className="flex items-center justify-center gap-2 m-2">
                  <span>{pkg.price}</span>
                  <img
                    src="/images/Saudi_Riyal_Symbol-1.png"
                    className={`w-5 h-5 ${
                      selectedPackage?.id === pkg.id
                        ? "filter-blue"
                        : "filter-white"
                    }`}
                    alt="ريال"
                  />
                </div>
              </button>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600">
              لا توجد باقات متاحة
            </p>
          )}
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
            <button
              onClick={handleApplyDiscount}
              className="w-full border text-[#085E9C] border-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white transition"
              disabled={discountLoading}
            >
              {discountLoading ? "جاري التطبيق..." : "تطبيق"}
            </button>
          </div>

          <p className="flex items-center justify-center gap-2 font-bold text-xl border px-3 py-2 rounded border-[#085E9C] text-[#085E9C] text-center">
            <span>
              ستدفع الآن <span className="mr-2">{displayPrice}</span>
            </span>
            <img
              src="/images/Saudi_Riyal_Symbol-1.png"
              className="w-5 h-5 filter-blue"
              alt="ريال"
            />
          </p>
        </div>

        {/* Gift Info */}
        {activeTab === "gift" && (
          <div className="space-y-4 mb-4">
            <p className="text-md text-gray-600">
              أدخل البريد الإلكتروني أو رقم الجوال الخاص بالمستلم
            </p>
            <PhoneInput
              country={"sa"}
              value={phone}
              enableSearch
              onChange={setPhone}
              inputClass="w-full border px-3 py-2 rounded focus:outline-none"
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none"
            />
            <p className="text-sm text-red-600">
              ملاحظة: يجب أن يكون رقم الجوال أو البريد الإلكتروني مسجّل لدينا .
            </p>
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full border text-[#085E9C] border-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white transition"
          disabled={paymentLoading}
        >
          {paymentLoading ? "جاري الدفع..." : "توجه لصفحة الدفع"}
        </button>
      </div>
    </div>
  );
};

export default GamePurchasePage;
