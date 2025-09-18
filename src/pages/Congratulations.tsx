import Header from "../components/Header";

const Congratulations = () => {
  return (
    <>
      {/* Header with Menu Icon */}
      <Header />
      <div className="flex items-center justify-center mt-12">
        <div className=" flex items-center justify-center p-6">
          <div>
            <div className="text-center text-[#588A17] text-[70px] font-[500]  mb-4 ">
              مبروووك{" "}
            </div>

            <div className="text-center cursor-pointer font-bold text-xl rounded-t   gap-2 bg-[#588A17] text-white  mx-2 py-4">
              علي حسين
            </div>

            <div className="text-center cursor-pointer text-[#588A17] border rounded-t-md font-bold  border-[#588A17] px-4  py-2  mb-2 ">
              {" "}
              4400{" "}
            </div>

            <div className=" flex items-center font-bold  ">
              <span className=" py-2 px-6 w-[60%] text-center text-[#fff] border  border-[#FF426E] rounded-tr-md bg-[#FF426E]">
                {" "}
                علي حسين{" "}
              </span>
              <span className="w-[40%] text-center border rounded-tl-md p-2 text-[#FF426E] border-[#FF426E]">
                2400
              </span>
            </div>

            <div className="text-center cursor-pointer text-[#085E9C] border font-bold  border-[#085E9C]  px-4 py-2  mt-4 ">
              العب مرة اخرى واستمتع
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Congratulations;
