import { useLocation } from "react-router-dom";

const AwnserPage = () => {
  const location = useLocation();
      const { answer } = location.state || {};
      console.log(answer)
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-12 mb-12 items-stretch">
      
      {/* Right Panel */}
      <div className="w-full md:w-1/5 border-2 border-[#085E9C] rounded flex flex-col">
        <div className="bg-[#FFC629] rounded-br-2xl rounded-tr-2xl rounded-tl-2xl mx-8 mt-6 flex items-center justify-center">
          <img src="/images/logo.png" className="w-16 h-16" alt="" />
        </div>
        <div className="text-center text-[#085E9C] font-bold mt-6">
          <span>التحدي</span> <br /> اسم الفئة <br /> <span>200 نقطة</span>
        </div>

        <div className="flex items-center justify-around text-white font-bold bg-[#085E9C] rounded py-2 m-4">
          <span>علي حسين</span>
          <span className="px-2">2400</span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center justify-center bg-[#085E9C] p-2 rounded">
            <img src="/images/hand.png" className="w-12" alt="" />
          </span>
          <span className="flex items-center justify-center bg-[#085E9C] p-2 rounded">
            <img src="/images/call.png" className="w-12" alt="" />
          </span>
        </div>

        <div className="flex items-center justify-around text-[#085E9C] border font-bold border-[#085E9C] rounded m-4">
          <span className="py-2">علي حسين</span>
          <span className="border-r py-2 px-2 border-[#085E9C]">2400</span>
        </div>

        <div className="flex items-center justify-center mb-2 gap-4">
          <span className="flex items-center justify-center border border-[#085E9C] p-2 rounded">
            <img src="/images/hand.png" className="w-12" alt="" />
          </span>
          <span className="flex items-center justify-center border border-[#085E9C] p-2 rounded">
            <img src="/images/call.png" className="w-12" alt="" />
          </span>
        </div>
      </div>

      {/* Center + Left */}
      <div className="flex flex-col md:flex-row w-full md:w-4/5 border-2 border-[#085E9C] rounded items-stretch">
        
        {/* Center */}
        <div className="w-full md:w-10/12 p-4">
          <div className="text-center w-full border border-black text-black rounded">
            <div className="text-xl py-8">القاهرة</div>
          </div>

          <div className="mt-4 w-full py-3 px-2 border border-black text-black rounded">
            <div className="flex items-center justify-center w-full h-[300px]">
              <img src="/images/back2.jpg" className="h-full w-full object-cover rounded" alt="" />
            </div>
          </div>
        </div>

        {/* Left */}
        <div className="flex flex-col justify-between w-full md:w-2/12 h-full">
          <div className="text-center cursor-pointer font-bold text-xl bg-[#085E9C] text-white rounded-br px-4 py-2">
            أبلاغ
          </div>

          <div>
            <div className="text-center text-[#085E9C] font-bold m-4">مين جاوب</div>

            <div className="text-center cursor-pointer text-[#085E9C] border font-bold border-[#085E9C] rounded px-4 py-2 m-2">علي حسين</div>
            <div className="text-center cursor-pointer text-[#085E9C] border font-bold border-[#085E9C] rounded px-4 py-2 m-2">محمد عبدالله</div>
            <div className="text-center cursor-pointer text-[#085E9C] border font-bold border-[#085E9C] rounded px-4 py-2 m-2">ولا أحد</div>

            <div className="bg-[#085E9C] cursor-pointer text-center font-bold text-lg text-white rounded-tr px-4 py-2">
              رجوع للسؤال
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwnserPage;
