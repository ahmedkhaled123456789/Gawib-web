import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Footer from "../components/Footer";

const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "966562596",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordsMatch = form.password === form.confirmPassword;

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 py-12 sm:px-2 sm:py-2"
      dir="rtl"
    >
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl text-center font-bold mb-6 text-[#085E9C]">
          {/* {isRegister ? "إنشاء حساب" : "تسجيل الدخول"} */}
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

        {isRegister ? (
          <RegisterForm
            form={form}
            handleChange={handleChange}
            passwordsMatch={passwordsMatch}
          />
        ) : (
          <LoginForm
            loginMethod={loginMethod}
            setLoginMethod={setLoginMethod}
            form={form}
            handleChange={handleChange}
          />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default AuthPage;
