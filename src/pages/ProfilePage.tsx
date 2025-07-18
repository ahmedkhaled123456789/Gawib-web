import React, { useEffect, useState } from "react";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getUser, updateUser } from "../store/auth/authSlice";
const ProfilePage = () => {

   const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
  
   useEffect(() => {
    dispatch(getUser({ id: "2" }));
  }, [dispatch]);
console.log(user)
  const [tab, setTab] = useState("account");
  const [form, setForm] = useState({
    firstName: "محمد",
    lastName: "عبدالله",
    email: "Mohd@hgotmail.com",
    phone: "5665296215",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const userId = "2"; // Or dynamically get from Redux, auth, or route param
    await dispatch(updateUser({ id: userId, data: form })).unwrap();
    alert("✅ تم حفظ التغييرات بنجاح!");
  } catch (err) {
    alert("❌ فشل حفظ التغييرات: " + err);
  }
};

  const passwordsMatch =
    form.password === form.confirmPassword || tab === "account";

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
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="الاسم الأول"
                className="border px-3 py-2 rounded focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
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

            {/* <div className="flex items-center border rounded overflow-hidden">
              <span className="bg-white px-2 py-2 flex items-center">
                <img
                  src="https://flagcdn.com/w40/sa.png"
                  alt="السعودية"
                  className="w-6 h-4 ml-1"
                />
                +966
              </span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="رقم الجوال"
                className="w-full px-2 py-2 focus:outline-none"
              />
            </div> */}
 <PhoneInput
        country={'sa'} // علم السعودية
        value={form.phone}
        onChange={() =>handleChange}
        
        inputProps={{
          dir: 'rtl',
        }}
        containerStyle={{ direction: 'rtl' }}
        inputStyle={{
          width: '100%',
          textAlign: 'right',
          borderRadius: '6px',
          paddingRight: '50px',
          padding:'20px 10px '
        }}
        buttonStyle={{
        backgroundColor: 'transparent',
         border: 'none',
         
          position: 'absolute',
          left: '0',
          right: 'auto',
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
          <form  onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              placeholder="كلمة المرور الحالية"
              name="currentPassword"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="كلمة المرور الجديدة"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none"
            />
            <input
              type="password"
              placeholder="تأكيد كلمة المرور"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none"
            />

            {!passwordsMatch && (
              <p className="text-red-500 text-sm">كلمة المرور غير متطابقة</p>
            )}

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
