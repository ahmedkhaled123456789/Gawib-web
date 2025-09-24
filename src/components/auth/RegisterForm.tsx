import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import type { ValidationErrors } from "../../pages/AuthPage";

interface RegisterFormProps {
  form: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      password: string;
      password_confirmation: string;
    }>
  >;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordsMatch: boolean;
  handleRegister: () => void;
  loading: boolean;
  validationErrors: ValidationErrors;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  form,
  setForm,
  handleChange,
  passwordsMatch,
  loading,
  handleRegister,
  validationErrors,
}) => {
  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto font-Tajawal">
      {/* الاسم الأول واسم العائلة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="الاسم الأول"
            className={`border px-3 py-2 rounded focus:outline-none w-full text-right ${
              validationErrors.first_name ? "border-red-500" : ""
            }`}
            value={form.first_name}
            onChange={handleChange}
          />
          {validationErrors.first_name && (
            <p className="text-red-500 text-xs text-right mt-1">
              {validationErrors.first_name}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            placeholder="اسم العائلة"
            className={`border px-3 py-2 rounded focus:outline-none w-full text-right ${
              validationErrors.last_name ? "border-red-500" : ""
            }`}
            value={form.last_name}
            onChange={handleChange}
          />
          {validationErrors.last_name && (
            <p className="text-red-500 text-xs text-right mt-1">
              {validationErrors.last_name}
            </p>
          )}
        </div>
      </div>

      {/* البريد الإلكتروني ورقم الجوال */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            className={`border px-3 py-2 rounded focus:outline-none w-full text-right ${
              validationErrors.email ? "border-red-500" : ""
            }`}
            value={form.email}
            onChange={handleChange}
          />
          {/* {validationErrors.email && (
            <p className="text-red-500 text-xs text-right mt-1">
              {validationErrors.email}
            </p>
          )} */}
        </div>

        {/* رقم الجوال */}
        <div>
          <PhoneInput
            country={"eg"}
            enableSearch
            value={form.phone_number.replace("+", "")}
            onChange={(value: string) =>
              setForm((prevForm) => ({
                ...prevForm,
                phone_number: `+${value}`,
              }))
            }
            inputProps={{
              dir: "rtl",
              name: "phone_number",
              className: validationErrors.phone_number ? "border-red-500" : "",
            }}
            containerStyle={{
              direction: "rtl",
              width: "100%",
              position: "relative",
            }}
            inputStyle={{
              width: "100%",
              textAlign: "right",
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
      </div>

      {/* كلمة المرور وتأكيدها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            className={`border px-3 py-2 rounded focus:outline-none w-full text-right ${
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
        <div>
          <input
            type="password"
            name="password_confirmation"
            placeholder="تأكيد كلمة المرور"
            className={`border px-3 py-2 rounded focus:outline-none w-full text-right ${
              validationErrors.password_confirmation ? "border-red-500" : ""
            }`}
            value={form.password_confirmation}
            onChange={handleChange}
          />
          {validationErrors.password_confirmation && (
            <p className="text-red-500 text-xs text-right mt-1">
              {validationErrors.password_confirmation}
            </p>
          )}
        </div>
      </div>

      {!passwordsMatch && !validationErrors.password_confirmation && (
        <p className="text-red-500 text-sm text-right">
          كلمة المرور غير متطابقة
        </p>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleRegister}
          disabled={loading || !passwordsMatch}
          className="w-full font-bold border border-[#085E9C] text-[#085E9C] py-2 rounded hover:bg-[#085E9C] hover:text-white transition disabled:opacity-50"
        >
          {loading ? "جارٍ الإنشاء..." : "إنشاء حساب"}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
