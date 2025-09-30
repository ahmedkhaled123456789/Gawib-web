import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { resetPassword } from "../store/resetPassword";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.password);

  // ⬅️ جلب token و email من URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const emailFromUrl = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    email: emailFromUrl, // يجي من الـ URL
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      toast("كلمتا المرور غير متطابقتين");
      return;
    }

    if (!token) {
      toast("الرابط غير صالح أو منتهي");
      return;
    }

    try {
      // ⬅️ إرسال البيانات مع token
      await dispatch(
        resetPassword({
          token,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        })
      ).unwrap();

      toast("تم إعادة تعيين كلمة المرور بنجاح");
      navigate("/auth");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast("خطأ في إعادة التعيين: " + (err?.message || ""));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full p-6 bg-white rounded shadow text-right">
        <h2 className="text-center text-xl font-bold text-[#085E9C] mb-4">
          إعادة تعيين كلمة المرور
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="w-full border px-3 py-2 rounded focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="كلمة المرور الجديدة"
            className="w-full border px-3 py-2 rounded focus:outline-none"
            required
          />

          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="تأكيد كلمة المرور"
            className="w-full border px-3 py-2 rounded focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 border border-[#085E9C] text-[#085E9C] rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "جاري الإرسال..." : "إعادة تعيين"}
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
