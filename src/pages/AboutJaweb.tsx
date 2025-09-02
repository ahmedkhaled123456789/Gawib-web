import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getSettings } from "../store/settingSlice";
import { useEffect } from "react";

const AboutJaweb = () => {
   const dispatch = useDispatch<AppDispatch>();
    const { settings} = useSelector((state: RootState) => state.settings
    ); 

     useEffect(() =>{
    dispatch(getSettings())
        },[])
  return (
    <div className="min-h-screen font-Tajawal flex items-center justify-center bg-white  p-20">
      <div className="text-center space-y-6">
        {/* العنوان */}
        <h2 className="text-[#085E9C] text-4xl font-bold">عن جاوب</h2>

        {/* مربع النص */}
        <div className="border rounded-md p-6 font-medium text-gray-800  text-right text-[30px]">
          {settings?.data[3].value}
         </div>

        {/* زر الإغلاق */}
        <button className="border-2 text-2xl font-bold w-[40%] border-[#085E9C] text-[#085E9C] px-8 py-2 rounded hover:bg-blue-50 transition">
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default AboutJaweb;
