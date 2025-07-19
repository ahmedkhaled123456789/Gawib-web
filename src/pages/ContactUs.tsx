import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../store/contactSlice";
import type { AppDispatch, RootState } from "../store";
import { toast } from "react-toastify";

const ContactUs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, contact } = useSelector((state: RootState) => state.contact);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, message } = form;

    if (!firstName || !lastName || !email || !message) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      await dispatch(addContact(form)).unwrap();
      toast.success("✅ تم إرسال رسالتك بنجاح");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("❌ حدث خطأ أثناء الإرسال");
    }
  };

  return (
    <div className="min-h-screen font-Tajawal max-w-3xl mx-auto px-4 py-12 sm:py-6 sm:px-2">
      <h2 className="text-[#085E9C] text-2xl font-bold text-center mb-10">اتصل بنا</h2>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="الاسم الأول"
              className="border border-gray-300 rounded px-4 py-2 text-right w-full"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="اسم العائلة"
              className="border border-gray-300 rounded px-4 py-2 text-right w-full"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني"
              className="border border-gray-300 rounded px-4 py-2 text-right w-full"
            />
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="اكتب نص الرسالة"
            className="w-full h-24 border border-gray-300 rounded px-4 py-2 text-right resize-none"
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="border w-[35%] border-gray-200 rounded px-6 py-6 space-y-6 text-right text-[#085E9C] bg-gray-50 shadow-sm">
            <div className="flex items-center gap-3">
              <img src="/images/3g.png" className="w-6 h-6" alt="" />
              <span className="text-lg">المملكة العربية السعودية</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/1g.png" className="w-6 h-6" alt="" />
              <span className="text-sm">info@jawb.com</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/2g.png" className="w-6 h-6" alt="" />
              <span className="text-sm">+966505960258</span>
            </div>
          </div>

          <div className="w-[35%]" />

          <div className="flex-1 w-[30%] flex flex-col gap-4 justify-center">
            {error && (
              <p className="text-[#B91C1C] text-center text-lg">{error}</p>
            )}

            <button
              type="submit"
              className="border-2 text-lg border-[#085E9C] text-[#085E9C] px-8 py-2 rounded hover:bg-blue-50 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "جاري الإرسال..." : "إرسال"}
            </button>

            {contact && (
              <p className="text-[#307F50] px-4 py-2 border shadow text-lg text-center">
                شكراً، تم إرسال رسالتك بنجاح
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
