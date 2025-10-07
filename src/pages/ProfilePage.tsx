import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getUser, updateUser } from "../store/auth/authSlice";
import { toast } from "sonner";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [tab, setTab] = useState("account");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.data) {
      setForm((prev) => ({
        ...prev,
        first_name: user.data.first_name || "",
        last_name: user.data.last_name || "",
        email: user.data.email || "",
        phone_number: user.data.phone_number || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phone_number: value });
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        updateUser({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
        })
      ).unwrap();
      toast.success(res.message || "✅ تم تحديث البيانات بنجاح!");
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      toast.error("❌ كلمة المرور غير متطابقة");
      return;
    }

    setIsLoading(true);
    try {
      const res = await dispatch(
        updateUser({
          current_password: form.current_password,
          password: form.password,
          password_confirmation: form.password_confirmation,
        })
      ).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch =
    form.password === form.password_confirmation || tab === "account";

  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-2 sm:py-2"
    >

      {/* زر العودة خارج الكارد */}
      <div className="w-full max-w-lg mb-4 flex justify-start">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={20} />
          رجوع
        </button>
      </div>
      {/* الكارد */}
      <div className="max-w-lg w-full p-4 bg-white rounded-md shadow text-right">
        <h2 className="text-center text-xl font-bold text-[#085E9C] mb-4">
          الملف الشخصي
        </h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/add-questions")}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#064c80] text-[#064c80] bg-white rounded-lg font-medium shadow-sm hover:bg-[#064c80] hover:text-white hover:shadow-md transition-all duration-300 ease-in-out"
          >
            <Plus size={20} />
            إضافة سؤال
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 p-1 w-full max-w-xs border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => setTab("account")}
              className={`px-4 py-1 ${
                tab === "account"
                  ? "bg-[#085E9C] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              حسابي
            </button>
            <button
              onClick={() => setTab("password")}
              className={`px-4 py-1 ${
                tab === "password"
                  ? "bg-[#085E9C] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              كلمة المرور
            </button>
          </div>
        </div>

        {/* Account Form */}
        {tab === "account" && (
          <form onSubmit={handleAccountSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="الاسم الأول"
                className="border px-3 py-2 rounded focus:outline-none"
              />
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="اسم العائلة"
                className="border px-3 py-2 rounded focus:outline-none"
              />
            </div>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني"
              className="w-full border px-3 py-2 rounded focus:outline-none"
            />

            <PhoneInput
              country={"sa"}
              value={form.phone_number}
              onChange={handlePhoneChange}
              enableSearch
              inputProps={{
                name: "phone_number",
                className: "border-red-500",
                dir: "ltr",
              }}
              containerStyle={{
                width: "100%",
                direction: "ltr",
              }}
              inputStyle={{
                width: "100%",
                textAlign: "left",
                borderRadius: "6px",
                paddingLeft: "48px",
                paddingRight: "10px",
                height: "42px",
                borderColor: "#ef4444",
                border: "1px solid #d1d5db",
                boxShadow: "none",
              }}
              buttonStyle={{
                backgroundColor: "transparent",
                border: "none",
                left: "0",
              }}
            />

            <button
              type="submit"
              className="w-full py-2 border border-[#085E9C] text-[#085E9C] rounded hover:bg-[#085E9C] hover:text-white transition"
            >
              حفظ التغييرات
            </button>
          </form>
        )}

        {/* Password Form */}
        {tab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="كلمة المرور الحالية"
                name="current_password"
                value={form.current_password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded pr-10"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور الجديدة"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded pr-10 focus:outline-none"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                placeholder="تأكيد كلمة المرور"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded pr-10 focus:outline-none"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
              >
                {showPasswordConfirmation ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            {!passwordsMatch && (
              <p className="text-red-500 text-sm">كلمة المرور غير متطابقة</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 flex justify-center items-center gap-2 border border-[#085E9C] text-[#085E9C] rounded hover:bg-[#085E9C] hover:text-white transition disabled:opacity-50"
            >
              {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
              تغيير كلمة المرور
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
