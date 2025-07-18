import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { loginUser, signupUser } from "../store/auth/authSlice";
  
const AuthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "966562596",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordsMatch = form.password === form.password_confirmation;

  const handleLogin = () => {
    const payload =
      loginMethod === "email"
        ? { email: form.email, password: form.password }
        : { phone: form.phone_number, password: form.password };

    dispatch(loginUser(payload));
  };

  const handleRegister = () => {
    if (!passwordsMatch) return;
    dispatch(signupUser(form));
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 sm:px-2 sm:py-2" dir="rtl">
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl text-center font-bold mb-6 text-[#085E9C]">
          إنشاء حساب أو تسجيل الدخول
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 w-full p-1 max-w-xs border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => setIsRegister(true)}
              className={`px-4 py-2 text-sm ${isRegister ? "bg-[#085E9C] text-white" : "text-gray-700"}`}
            >
              إنشاء حساب
            </button>
            <button
              onClick={() => setIsRegister(false)}
              className={`px-4 py-2 text-sm ${!isRegister ? "bg-[#085E9C] text-white" : "text-gray-700"}`}
            >
              تسجيل الدخول
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {isRegister ? (
          <RegisterForm
            form={form}
            handleChange={handleChange}
            passwordsMatch={passwordsMatch}
            handleRegister={handleRegister}
            loading={loading}
          />
        ) : (
          <LoginForm
            loginMethod={loginMethod}
            setLoginMethod={setLoginMethod}
            form={form}
            handleChange={handleChange}
            handleLogin={handleLogin}
            loading={loading}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
