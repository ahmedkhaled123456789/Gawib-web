import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [message, setMessage] = useState("جاري التحقق من الدفع...");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const paymentId = searchParams.get("payment_id"); 

    if (!paymentId) {
      setMessage("فشل الدفع ❌");
      setLoading(false);
      return;
    }

    fetch(`https://test.jawib.net/api/${paymentId}/return`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("✅ تمت عملية الدفع بنجاح!");
          setTimeout(() => navigate("/success"), 2000);
        } else {
          setMessage("❌ فشل الدفع");
        }
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ خطأ في الاتصال");
        setLoading(false);
      });
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">{message}</h1>
      {loading && <p>انتظر لحظة...</p>}
    </div>
  );
};

export default PaymentPage;
