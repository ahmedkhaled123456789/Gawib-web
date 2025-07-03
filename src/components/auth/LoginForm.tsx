import { Link } from "react-router-dom";

interface LoginFormProps {
  loginMethod: "email" | "phone";
  setLoginMethod: (method: "email" | "phone") => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginMethod, setLoginMethod, form, handleChange }) => {
  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4">
        <div className="grid grid-cols-2 p-1 w-full max-w-xs border border-gray-300 rounded overflow-hidden">
        
          <button
            onClick={() => setLoginMethod("phone")}
            className={`px-4 py-2 text-sm transition ${
              loginMethod === "phone" ? "bg-[#FFC629] font-bold text-[#085E9C]" : "text-gray-700"
            }`}
          >
            رقم الجوال
          </button>
            <button
            onClick={() => setLoginMethod("email")}
            className={`px-4 py-2 text-sm transition ${
              loginMethod === "email" ? "bg-[#FFC629] text-[#085E9C] font-bold" : "text-gray-700"
            }`}
          >
            البريد الإلكتروني
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 w-full max-w-md mx-auto">
        {loginMethod === "phone" && (
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="tel"
              name="phone"
              placeholder="أدخل رقم الجوال"
              className="flex-1 focus:outline-none text-right"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        )}

        {loginMethod === "email" && (
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            className="border focus:outline-none px-3 py-2 rounded w-full text-right"
            value={form.email}
            onChange={handleChange}
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          className="border px-3 py-2 focus:outline-none rounded w-full text-right"
          value={form.password}
          onChange={handleChange}
        />

        {/* Login + Forget Password */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <button className="w-full sm:w-1/2 font-bold border border-[#085E9C] text-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white transition">
            دخول
          </button>

          <Link to="/forgetPassword" className="text-sm text-gray-500 text-center sm:text-right hover:underline">
            نسيت كلمة المرور؟
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
