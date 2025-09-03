/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoveLeft, MoveRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const QuestionPage = () => {
   const location = useLocation();
    const { question } = location.state || {};
    console.log(question)
const navigate = useNavigate();

     const handleClick= (data: any) =>{

    navigate("/Awnser", { state: { answer: data } });
  }
  return (
    <div className="p-4 sm:p-12">
      <div className="flex flex-col md:flex-row items-stretch gap-6 min-h-[600px]">
        {/* Right panel */}
        <div className="border-2 border-[#085E9C] rounded w-full md:w-1/5">
          <div className="bg-[#FFC629] rounded-br-2xl rounded-tr-2xl rounded-tl-2xl mx-8 mt-6 flex items-center justify-center">
            <img src="/images/logo.png" className="w-12 h-12 sm:w-16 sm:h-16" alt="Logo" />
          </div>
          <div className="text-center text-[#085E9C] font-bold mt-8 sm:mt-16 text-sm sm:text-base">
            اسم الفئة <br /> <span>{question?.points} نقطة</span>
          </div>
          <div className="flex items-center justify-around text-white font-bold bg-[#085E9C] rounded py-2 m-4 text-sm sm:text-base">
            <span>علي حسين</span>
            <span className="px-2">2400</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center justify-center bg-[#085E9C] p-2 rounded">
              <img src="/images/hand.png" className="w-8 sm:w-12" alt="hand" />
            </span>
            <span className="flex items-center justify-center bg-[#085E9C] p-2 rounded">
              <img src="/images/call.png" className="w-8 sm:w-12" alt="call" />
            </span>
          </div>
          <div className="flex items-center justify-around text-[#085E9C] border font-bold border-[#085E9C] rounded m-4 text-sm sm:text-base">
            <span className="py-2">علي حسين</span>
            <span className="border-r py-2 px-2 border-[#085E9C]">2400</span>
          </div>
          <div className="flex items-center justify-center mb-4 gap-4">
            <span className="flex items-center justify-center border border-[#085E9C] p-2 rounded">
              <img src="/images/hand.png" className="w-8 sm:w-12" alt="hand" />
            </span>
            <span className="flex items-center justify-center border border-[#085E9C] p-2 rounded">
              <img src="/images/call.png" className="w-8 sm:w-12" alt="call" />
            </span>
          </div>
        </div>

        {/* Main content (center + left) */}
        <div className="flex flex-col md:flex-row border-2 border-[#085E9C] rounded w-full md:w-4/5 h-auto md:h-[600px]">
          {/* Center */}
          <div className="w-full md:w-10/12 p-4">
            <div className="text-center w-full border border-black text-black rounded-br">
              <div className="text-3xl py-6">  {question.question.text|| "ماهي عاصمة مصر "}</div>
              <div className="flex items-center justify-end gap-2">
                <div className="flex items-center gap-2 text-[#085E9C] py-2 px-3 border-t border-r border-black rounded-tr">
                  <MoveRight />
                  {/* <span>10 سنوات</span> */}
                  <span>{question.hint}</span>
                  <MoveLeft />
                </div>
              </div>
            </div>

            <div className="mt-4 w-full py-3 px-2 border border-black text-black rounded">
              <div className="flex items-center justify-center w-full h-[250px] sm:h-[300px]">
                <img
                  src="/images/back.jpg"
                  className="object-contain h-full w-full"
                  alt="back"
                />
              </div>
            </div>
          </div>

          {/* Left */}
          <div className="flex flex-col justify-between w-full md:w-2/12 h-[150px] md:h-full">
            {/* Timer and play */}
            <div className="flex items-center justify-center gap-2 bg-[#085E9C] text-white rounded-br px-2 py-2">
              <img src="/images/loop.png" className="w-6 h-6 md:w-8 md:h-8" alt="loop" />
              <span className="text-sm md:text-base">01:25</span>
              <img src="/images/play.png" className="w-6 h-6 md:w-8 md:h-8" alt="play" />
            </div>

            {/* Answer button */}
            <div className="bg-[#085E9C] text-center font-bold text-lg md:text-2xl text-white rounded-tr px-4 py-2 cursor-pointer"
            onClick={() => handleClick(question)}
            >
              الإجابة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
