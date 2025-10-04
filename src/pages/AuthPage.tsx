import React, { useState, useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { loginUser, signupUser } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// واجهات للبيانات
export type AuthFormData = Record<string, string> & {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  nationality?: string;
};

export interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  password_confirmation?: string;
  general?: string;
}

const AuthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: authError } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const [form, setForm] = useState<AuthFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    nationality: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // مسح خطأ الحقل عند البدء بالكتابة
    if (validationErrors[name as keyof ValidationErrors]) {
      const newErrors = { ...validationErrors };
      delete newErrors[name as keyof ValidationErrors];
      setValidationErrors(newErrors);
    }
  };

  // مسح الأخطاء عند التبديل بين التسجيل والدخول
  useEffect(() => {
    setValidationErrors({});
  }, [isRegister]);

  const validateLoginForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (loginMethod === "email") {
      if (!form.email) {
        errors.email = "البريد الإلكتروني مطلوب";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "صيغة البريد الإلكتروني غير صحيحة";
      }
    } else {
      if (!form.phone_number) {
        errors.phone_number = "رقم الجوال مطلوب";
      } else if (form.phone_number.replace(/\D/g, "").length < 10) {
        errors.phone_number = "رقم الجوال يجب أن يكون على الأقل 10 أرقام";
      }
    }

    if (!form.password) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (form.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون على الأقل 6 أحرف";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!form.first_name) {
      errors.first_name = "الاسم الأول مطلوب";
    }

    if (!form.last_name) {
      errors.last_name = "اسم العائلة مطلوب";
    }

    if (!form.email) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (!form.phone_number) {
      errors.phone_number = "رقم الجوال مطلوب";
    } else if (form.phone_number.replace(/\D/g, "").length < 10) {
      errors.phone_number = "رقم الجوال يجب أن يكون على الأقل 10 أرقام";
    }

    if (!form.password) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (form.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون على الأقل 6 أحرف";
    }

    if (!form.password_confirmation) {
      errors.password_confirmation = "تأكيد كلمة المرور مطلوب";
    } else if (form.password !== form.password_confirmation) {
      errors.password_confirmation = "كلمة المرور غير متطابقة";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError); // 🔥 عرض رسالة الخطأ في toast
    }
  }, [authError]);

  const handleLogin = async () => {
    if (!validateLoginForm()) return;

    const payload =
      loginMethod === "email"
        ? { email: form.email, password: form.password }
        : { phone_number: form.phone_number, password: form.password };

    const result = await dispatch(loginUser(payload));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleRegister = async () => {
    if (!validateRegisterForm()) return;

    const result = await dispatch(signupUser(form));
    if (signupUser.fulfilled.match(result)) {
      toast.success("تم إنشاء الحساب بنجاح، برجاء تسجيل الدخول");
      setIsRegister(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 py-12 sm:px-2 sm:py-2"
      dir="rtl"
    >
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl text-center font-bold mb-6 text-[#085E9C]">
          إنشاء حساب أو تسجيل الدخول
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 w-full p-1 max-w-xs border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => setIsRegister(true)}
              className={`px-4 py-2 text-sm ${
                isRegister ? "bg-[#085E9C] text-white" : "text-gray-700"
              }`}
            >
              إنشاء حساب
            </button>
            <button
              onClick={() => setIsRegister(false)}
              className={`px-4 py-2 text-sm ${
                !isRegister ? "bg-[#085E9C] text-white" : "text-gray-700"
              }`}
            >
              تسجيل الدخول
            </button>
          </div>
        </div>

        {isRegister ? (
          <RegisterForm
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            passwordsMatch={form.password === form.password_confirmation}
            handleRegister={handleRegister}
            loading={loading}
            validationErrors={validationErrors}
          />
        ) : (
          <LoginForm
            setForm={setForm}
            loginMethod={loginMethod}
            setLoginMethod={setLoginMethod}
            form={form}
            handleChange={handleChange}
            handleLogin={handleLogin}
            loading={loading}
            validationErrors={validationErrors}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
