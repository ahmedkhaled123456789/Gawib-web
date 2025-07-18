import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
interface RegisterFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordsMatch: boolean;
  handleRegister: () => void;
  loading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  form,
  handleChange,
  passwordsMatch,
  loading,
  handleRegister
}) => {
 

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto font-Tajawal">
      {/* الاسم الأول واسم العائلة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="first_name"
          placeholder="الاسم الأول"
          className="border px-3 py-2 rounded focus:outline-none w-full text-right"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="اسم العائلة"
          className="border px-3 py-2 rounded focus:outline-none w-full text-right"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>

      {/* البريد الإلكتروني */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <input
        type="email"
        name="email"
        placeholder="البريد الإلكتروني"
        className="border px-3 py-2 rounded focus:outline-none w-full text-right"
        value={form.email}
        onChange={handleChange}
      />

      {/* رقم الجوال */}
         <PhoneInput
        country={'sa'} // علم السعودية
        value={form.phone_number}
        onChange={() => handleChange}
        
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
       </div>
    

      {/* كلمة المرور وتأكيدها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          className="border px-3 py-2 rounded focus:outline-none w-full text-right"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="تأكيد كلمة المرور"
          className="border px-3 py-2 rounded focus:outline-none w-full text-right"
          value={form.password_confirmation}
          onChange={handleChange}
        />
      </div>

      {/* رسالة التحقق من كلمة المرور */}
      {!passwordsMatch && (
        <p className="text-red-500 text-sm text-right">كلمة المرور غير متطابقة</p>
      )}

      {/* زر إنشاء حساب */}
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
