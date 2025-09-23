/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoveLeft, MoveRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  setFirstTeamCall,
  setSecondTeamCall,
  setFirstTeamDoublePoints,
  setSecondTeamDoublePoints,
} from "../store/gameFeaturesSlice";

const QuestionPage = () => {
  const location = useLocation();
  const { question, game } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // القيم من الـ Redux
  const {
    first_team_call,
    second_team_call,
    first_team_double_points,
    second_team_double_points,
  } = useSelector((state: RootState) => state.gameFeatures);

  const handleClick = (data: any) => {
    navigate("/Awnser", { state: { answer: data, game } });
  };

  return (
    <div className="p-4 sm:p-12">
      <div className="flex flex-col md:flex-row items-stretch gap-6 min-h-[600px]">
        {/* Right panel */}
        <div className="border-2 border-[#085E9C] rounded w-full md:w-1/5">
          {/* Logo */}
          <div className="bg-[#FFC629] rounded-br-2xl rounded-tr-2xl rounded-tl-2xl mx-8 mt-6 flex items-center justify-center">
            <img
              src="/images/logo.png"
              className="w-12 h-12 sm:w-16 sm:h-16"
              alt="Logo"
            />
          </div>

          {/* Game name + points */}
          <div className="text-center text-[#085E9C] font-bold mt-8 sm:mt-16 text-sm sm:text-base">
            {game?.data?.details?.game_name}
            <br />
            <span>{question?.points ?? "-"} نقطة</span>
          </div>

          {/* First team score */}
          <div className="flex items-center justify-around text-white font-bold bg-[#085E9C] rounded py-2 m-4 text-sm sm:text-base">
            <span>{game?.data?.details?.first_team_name}</span>
            <span className="px-2">
              {game?.data?.details?.first_team_score}
            </span>
          </div>

          {/* Action icons */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`flex items-center justify-center p-2 rounded cursor-pointer ${
                first_team_double_points ? "bg-green-500" : "bg-[#085E9C]"
              }`}
              onClick={() =>
                dispatch(
                  setFirstTeamDoublePoints(first_team_double_points ? 0 : 1)
                )
              }
            >
              <img src="/images/hand.png" className="w-8 sm:w-12" alt="hand" />
            </span>
            <span
              className={`flex items-center justify-center p-2 rounded cursor-pointer ${
                first_team_call ? "bg-green-500" : "bg-[#085E9C]"
              }`}
              onClick={() =>
                dispatch(setFirstTeamCall(first_team_call ? 0 : 1))
              }
            >
              <img src="/images/call.png" className="w-8 sm:w-12" alt="call" />
            </span>
          </div>

          {/* Second team score */}
          <div className="flex items-center justify-around text-[#085E9C] border font-bold border-[#085E9C] rounded m-4 text-sm sm:text-base">
            <span className="py-2">
              {game?.data?.details?.second_team_name}
            </span>
            <span className="border-r py-2 px-2 border-[#085E9C]">
              {game?.data?.details?.second_team_score}
            </span>
          </div>

          <div className="flex items-center justify-center mb-4 gap-4">
            <span
              className={`flex items-center justify-center border p-2 rounded cursor-pointer ${
                second_team_double_points ? "bg-green-500" : "border-[#085E9C]"
              }`}
              onClick={() =>
                dispatch(
                  setSecondTeamDoublePoints(second_team_double_points ? 0 : 1)
                )
              }
            >
              <img src="/images/hand.png" className="w-8 sm:w-12" alt="hand" />
            </span>
            <span
              className={`flex items-center justify-center border p-2 rounded cursor-pointer ${
                second_team_call ? "bg-green-500" : "border-[#085E9C]"
              }`}
              onClick={() =>
                dispatch(setSecondTeamCall(second_team_call ? 0 : 1))
              }
            >
              <img src="/images/call.png" className="w-8 sm:w-12" alt="call" />
            </span>
          </div>
        </div>

        {/* Main content (center + left) */}
        <div className="flex flex-col md:flex-row border-2 border-[#085E9C] rounded w-full md:w-4/5 h-auto md:h-[600px]">
          {/* Center */}
          <div className="w-full md:w-10/12 p-4">
            <div className="text-center w-full  rounded-br">
              <div className="border-2 border-[#848484] text-xl md:text-2xl font-bold p-0">
                {/* النص */}
                {question?.question?.text && (
                  <div className="flex justify-center items-center text-center w-full py-4">
                    {question.question.text}
                  </div>
                )}

                {question?.hint && (
                  <div className="flex items-center justify-end gap-x-2">
                    <div className="flex items-center gap-2 text-[#085E9C] py-2 px-3 border border-black border-l-0 border-b-0 rounded-tr">
                      <MoveRight />
                      <span>{question.hint}</span>
                      <MoveLeft />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-3xl py-6 flex flex-col items-center gap-4 border-2 border-[#848484] min-h-[300px] mt-2">
                {/* الصورة */}
                <img
                  src={question?.question?.image || "/images/back.jpg"}
                  alt="question"
                  className="mx-auto max-h-96 w-screen object-contain"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/back.jpg";
                  }}
                />

                {/* الصوت */}
                {question?.question?.audio && (
                  <audio
                    controls
                    src={question.question.audio}
                    className="mx-auto"
                  />
                )}

                {/* الفيديو */}
                {question?.question?.video && (
                  <video
                    controls
                    src={question.question.video}
                    className="mx-auto max-h-60"
                  />
                )}

                {/* لو مفيش أي حاجة */}
                {!question?.question?.text &&
                  !question?.question?.image &&
                  !question?.question?.audio &&
                  !question?.question?.video &&
                  "مفيش سؤال"}
              </div>
            </div>
          </div>

          {/* Left */}
          <div className="flex flex-col justify-between w-full md:w-2/12 h-[150px] md:h-full">
            {/* Timer and play */}
            <div className="flex items-center justify-center gap-2 bg-[#085E9C] text-white rounded-br px-2 py-2">
              <img
                src="/images/loop.png"
                className="w-6 h-6 md:w-8 md:h-8"
                alt="loop"
              />
              <span className="text-sm md:text-base">01:25</span>
              <img
                src="/images/play.png"
                className="w-6 h-6 md:w-8 md:h-8"
                alt="play"
              />
            </div>

            {/* Answer button */}
            {/* Answer button أو زرار الرجوع */}
            {question?.question?.text ||
            question?.question?.image ||
            question?.question?.audio ||
            question?.question?.video ? (
              <div
                className="bg-[#085E9C] text-center font-bold text-lg md:text-2xl text-white rounded-tr px-4 py-2 cursor-pointer"
                onClick={() => handleClick(question)}
              >
                الإجابة
              </div>
            ) : (
              <div
                className="bg-gray-500 text-center font-bold text-lg md:text-2xl text-white rounded-tr px-4 py-2 cursor-pointer"
                onClick={() => navigate(-1)} // ترجع للصفحة السابقة
              >
                الرجوع
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
