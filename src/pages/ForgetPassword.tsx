import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { resetPasswordEmail } from "../store/resetPassword";
  
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordEmail({ email }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-2 sm:py-2">
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow text-right">
        <h2 className="text-center text-xl font-bold text-[#085E9C] mb-4">
          نسيت كلمة المرور
        </h2>
        <p className="text-center text-xl text-gray-700 mb-4">
          فضلاً أدخل بريدك الإلكتروني ليصلك رابط تغيير كلمة المرور
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
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
            {loading ? "جاري الإرسال..." : "إرسال"}
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
