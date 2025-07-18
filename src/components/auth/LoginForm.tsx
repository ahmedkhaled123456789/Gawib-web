import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
interface LoginFormProps {
  loginMethod: "email" | "phone";
  setLoginMethod: (method: "email" | "phone") => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginMethod, setLoginMethod, form, handleChange ,handleLogin,loading}) => {
   
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
               <PhoneInput
        country={'sa'} // علم السعودية
        value={form.phone_number}
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
         <button
  onClick={handleLogin}
  disabled={loading}
  className="w-full sm:w-1/2 font-bold border border-[#085E9C] text-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white transition disabled:opacity-50"
>
  {loading ? "جاري الدخول..." : "دخول"}
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
