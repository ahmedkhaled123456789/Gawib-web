import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value );
  };

  
  return (
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-2 sm:py-2">
  <div className="  max-w-md mx-auto   p-4 bg-white rounded-md shadow text-right">
      <h2 className="text-center text-xl font-bold text-[#085E9C] mb-4">
نسيت كلمة المرور       </h2>
<p className="text-center text-xl  text-gray-700 mb-4">
    فظلاً أدخل بريدك الإلكتروني ليصلك رابط تغيير كلمة المرور
</p>

     

      

        <form className="space-y-6">
         

          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="w-full border px-3 py-2 rounded focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 border border-[#085E9C] text-[#085E9C] rounded"
          >
إرسال          </button>
        </form>

     
    </div>
        </div>

  
  );
};

export default ForgetPassword;
