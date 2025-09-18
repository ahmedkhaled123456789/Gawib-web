import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getUser, updateUser } from "../store/auth/authSlice";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

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

  // حالات إظهار كلمة المرور
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  // تحميل بيانات المستخدم
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // تحديث الفورم أول ما ييجي user
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

  // تحديث بيانات الحساب فقط
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
      console.log(res);
      toast.success(res.message || "✅ تم تحديث البيانات بنجاح!");
    } catch (err: any) {
      toast.error(err);
    }
  };

  // تحديث كلمة المرور فقط
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      toast.error("❌ كلمة المرور غير متطابقة");
      return;
    }
    try {
      const res = await dispatch(
        updateUser({
          current_password: form.current_password,
          password: form.password,
          password_confirmation: form.password_confirmation,
        })
      ).unwrap();
      console.log(res);
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err);
    }
  };

  const passwordsMatch =
    form.password === form.password_confirmation || tab === "account";


  if (loading) {
    return <p className="text-center mt-10">جاري تحميل البيانات...</p>;
  }

  return (
    <div
      dir="rtl"
      className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-2 sm:py-2"
    >
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow text-right w-full">
        <h2 className="text-center text-xl font-bold text-[#085E9C] mb-4">
          الملف الشخصي
        </h2>

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
              country={"sa"} // علم السعوديةa
              value={form.phone_number}
              onChange={handlePhoneChange}
              enableSearch
              inputProps={{
                dir: "rtl",
              }}
              containerStyle={{ direction: "rtl" }}
              inputStyle={{
                width: "100%",
                textAlign: "right",
                borderRadius: "6px",
                paddingRight: "50px",
                padding: "20px 10px ",
              }}
              buttonStyle={{
                backgroundColor: "transparent",
                border: "none",
                position: "absolute",
                left: "0",
                right: "auto",
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

            {/* عرض زر تغيير كلمة المرور فقط إذا كان هناك بيانات مدخلة */}
            
              <button
                type="submit"
                className="w-full py-2 border border-[#085E9C] text-[#085E9C] rounded hover:bg-[#085E9C] hover:text-white transition"
              >
                تغيير كلمة المرور
              </button>
            
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
