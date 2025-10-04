import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import type { ValidationErrors } from "../../pages/AuthPage";

interface LoginFormProps {
  loginMethod: "email" | "phone";
  setLoginMethod: (method: "email" | "phone") => void;
  setForm: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      password: string;
      password_confirmation: string;
      nationality?: string;
    }>
  >;
  form: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    nationality?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  loading: boolean;
  validationErrors: ValidationErrors;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setForm,
  loginMethod,
  setLoginMethod,
  form,
  handleChange,
  handleLogin,
  loading,
  validationErrors,
}) => {
  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4">
        <div className="grid grid-cols-2 p-1 w-full max-w-xs border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => setLoginMethod("phone")}
            className={`px-4 py-2 text-sm transition ${
              loginMethod === "phone"
                ? "bg-[#FFC629] font-bold text-[#085E9C]"
                : "text-gray-700"
            }`}
          >
            رقم الجوال
          </button>
          <button
            onClick={() => setLoginMethod("email")}
            className={`px-4 py-2 text-sm transition ${
              loginMethod === "email"
                ? "bg-[#FFC629] text-[#085E9C] font-bold"
                : "text-gray-700"
            }`}
          >
            البريد الإلكتروني
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 w-full max-w-md mx-auto">
        {loginMethod === "phone" && (
          <div>
            <PhoneInput
              country={"sa"}
              enableSearch
              value={form.phone_number?.replace("+", "") || ""}
              onChange={(value: string, country: any) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  phone_number: `+${value}`,
                  nationality: country?.name?.toUpperCase() || "", // 👈 هنا بنسجل الجنسية
                }))
              }
              inputProps={{
                name: "phone_number",
                dir: "ltr", // 👈 مهم علشان الرقم يبان صح
              }}
              containerStyle={{
                direction: "ltr", // 👈 خليه LTR مش RTL
                width: "100%",
                position: "relative",
              }}
              inputStyle={{
                width: "100%",
                textAlign: "right", // 👈 كده الرقم هيظهر صح ومحاذي يمين
                borderRadius: "6px",
                paddingRight: "50px",
                padding: "20px 10px",
                borderColor: validationErrors.phone_number ? "#ef4444" : "",
              }}
              buttonStyle={{
                backgroundColor: "transparent",
                border: "none",
                position: "absolute",
                left: "0",
                right: "auto",
              }}
            />

            {validationErrors.phone_number && (
              <p className="text-red-500 text-xs text-right mt-1">
                {validationErrors.phone_number}
              </p>
            )}
          </div>
        )}

        {loginMethod === "email" && (
          <div>
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              className={`border focus:outline-none px-3 py-2 rounded w-full text-right ${
                validationErrors.email ? "border-red-500" : ""
              }`}
              value={form.email}
              onChange={handleChange}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs text-right mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>
        )}

        {/* كلمة المرور */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            className={`border px-3 py-2 focus:outline-none rounded w-full text-right ${
              validationErrors.password ? "border-red-500" : ""
            }`}
            value={form.password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-xs text-right mt-1">
              {validationErrors.password}
            </p>
          )}
        </div>

        {/* Login + Forget Password */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full sm:w-1/2 font-bold border border-[#085E9C] text-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white transition disabled:opacity-50"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>

          <Link
            to="/forgetPassword"
            className="text-sm text-gray-500 text-center sm:text-right hover:underline"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
