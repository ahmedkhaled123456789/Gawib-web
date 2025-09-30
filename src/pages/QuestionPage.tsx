/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoveLeft, MoveRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  setFirstTeamCall,
  setSecondTeamCall,
  setFirstTeamTwoAnswers,
  setSecondTeamTwoAnswers,
} from "../store/gameFeaturesSlice";
import Timer from "../components/Timer";

const QuestionPage = () => {
  const location = useLocation();
  const { question, game } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(game);

  const {
    first_team_call,
    second_team_call,
    first_team_two_answers,
    second_team_two_answers,
  } = useSelector((state: RootState) => state.gameFeatures);

  const currentTeam = game?.data?.details?.current_team; // 1 أو 2
  const isFirstTeamActive = currentTeam === 1;
  const isSecondTeamActive = currentTeam === 2;

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

          {/* First team action icons */}
          <div className="flex items-center justify-center gap-4">
            {/* Two Answers */}
            <span
              className={`flex items-center justify-center p-2 rounded ${
                first_team_two_answers ||
                game?.data?.details?.first_team_two_answers
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#085E9C] cursor-pointer"
              } ${!isFirstTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isFirstTeamActive &&
                !game?.data?.details?.first_team_two_answers &&
                dispatch(setFirstTeamTwoAnswers(first_team_two_answers ? 0 : 1))
              }
            >
              <img
                src="/images/hand.png"
                className="w-8 sm:w-12"
                alt="two-answers"
              />
            </span>

            {/* Call */}
            <span
              className={`flex items-center justify-center p-2 rounded ${
                first_team_call || game?.data?.details?.first_team_call
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#085E9C] cursor-pointer"
              } ${!isFirstTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isFirstTeamActive &&
                !game?.data?.details?.first_team_call &&
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

          {/* Second team action icons */}
          <div className="flex items-center justify-center mb-4 gap-4">
            {/* Two Answers */}
            <span
              className={`flex items-center justify-center border p-2 rounded ${
                second_team_two_answers ||
                game?.data?.details?.second_team_two_answers
                  ? "bg-gray-400 cursor-not-allowed"
                  : "border-[#085E9C] cursor-pointer"
              } ${!isSecondTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isSecondTeamActive &&
                !game?.data?.details?.second_team_two_answers &&
                dispatch(
                  setSecondTeamTwoAnswers(second_team_two_answers ? 0 : 1)
                )
              }
            >
              <img
                src="/images/hand.png"
                className="w-8 sm:w-12"
                alt="two-answers"
              />
            </span>

            {/* Call */}
            <span
              className={`flex items-center justify-center border p-2 rounded ${
                second_team_call || game?.data?.details?.second_team_call
                  ? "bg-gray-400 cursor-not-allowed"
                  : "border-[#085E9C] cursor-pointer"
              } ${!isSecondTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isSecondTeamActive &&
                !game?.data?.details?.second_team_call &&
                dispatch(setSecondTeamCall(second_team_call ? 0 : 1))
              }
            >
              <img src="/images/call.png" className="w-8 sm:w-12" alt="call" />
            </span>
          </div>
        </div>

        {/* Main content (center + left) */}
        <div className="flex flex-col md:flex-row border-2 border-[#085E9C] rounded w-full md:w-4/5 h-auto md:h-[600px]">
          {/* Center QuestionPage */}
          <div className="w-full md:w-10/12 p-4">
            <div className="text-center w-full rounded-br">
              <div className="border-2 border-[#848484] text-xl md:text-2xl font-bold p-0">
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
                {question?.question?.video ? (
                  <video
                    controls
                    src={question.question.video}
                    className="mx-auto max-h-96 w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLVideoElement).src =
                        "/images/back.jpg"; // Fallback to an image if video fails
                    }}
                  />
                ) : question?.question?.audio ? (
                  <audio
                    controls
                    src={question.question.audio}
                    className="mx-auto"
                  />
                ) : (
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
                )}
              </div>
            </div>
          </div>

          {/* Left */}
          <div className="flex flex-col justify-between w-full md:w-2/12 h-[150px] md:h-full">
            {/* Timer component */}
            <Timer />

            {/* Answer button */}
            {question?.question?.text ||
            question?.question?.image ||
            question?.question?.audio ||
            question?.question?.video ? (
              <div
                className={`bg-[#085E9C] text-center font-bold text-lg md:text-2xl text-white rounded-tr px-4 py-2 ${
                  currentTeam
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => currentTeam && handleClick(question)}
              >
                الإجابة
              </div>
            ) : (
              <div
                className="bg-gray-500 text-center font-bold text-lg md:text-2xl text-white rounded-tr px-4 py-2 cursor-pointer"
                onClick={() => navigate(-1)}
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
