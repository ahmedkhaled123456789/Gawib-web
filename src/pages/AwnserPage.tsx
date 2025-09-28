// src/pages/AwnserPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { updateAnswer, type AnswerData } from "../store/answerSlice";
import {
  setFirstTeamCall,
  setSecondTeamCall,
  setFirstTeamDoublePoints,
  setSecondTeamDoublePoints,
} from "../store/gameFeaturesSlice";
import { endGame } from "../store/endGameSlic";
import { toast } from "sonner";
import ReportModal from "../components/ReportModal";
import EndGameModal from "../components/EndGameModal";
import { useState } from "react";

const AwnserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answer, game } = location.state || {};
  const dispatch = useDispatch<AppDispatch>();
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [modalEndGameOpen, setModalEndGameOpen] = useState<boolean>(false);

  const { loading } = useSelector((state: RootState) => state.answer);
  const {
    first_team_call,
    second_team_call,
    first_team_double_points,
    second_team_double_points,
  } = useSelector((state: RootState) => state.gameFeatures);

  const details = game?.data?.details;

  // الفريق الحالي
  const currentTeam = details?.current_team;
  const isFirstTeamActive = currentTeam === 1;
  const isSecondTeamActive = currentTeam === 2;

  // اختيار الفريق
  const handleSelectTeam = (team: "first_team" | "second_team" | "none") => {
    if (loading) return;
    if (!game || !answer) {
      toast.error("لا توجد بيانات اللعبة أو السؤال");
      return;
    }

    const questionPoints = answer?.points || 0;
    let firstTeamScore = details.first_team_score || 0;
    let secondTeamScore = details.second_team_score || 0;
    let nextTeam = details.current_team || 1;

    // تحديث النقاط والدور
    if (team === "first_team") {
      firstTeamScore += first_team_double_points
        ? questionPoints * 2
        : questionPoints;
      nextTeam = 2;
    } else if (team === "second_team") {
      secondTeamScore += second_team_double_points
        ? questionPoints * 2
        : questionPoints;
      nextTeam = 1;
    } else if (team === "none") {
      nextTeam = nextTeam === 1 ? 2 : 1;
    }

    const selectedData: AnswerData = {
      id: details.id,
      question_id: answer.id,
      who_answered: 0,
      current_team: nextTeam,
    };

    if (team === "first_team") {
      selectedData.who_answered = 1;
      selectedData.first_team_score = firstTeamScore;
    } else if (team === "second_team") {
      selectedData.who_answered = 2;
      selectedData.second_team_score = secondTeamScore;
    } else {
      selectedData.who_answered = 0;
    }

    // double/call → ابعتها بس لو لسه مش مستخدمة في الـ backend
    if (first_team_double_points && !details.first_team_double_points) {
      selectedData.first_team_double_points = 1;
    }
    if (second_team_double_points && !details.second_team_double_points) {
      selectedData.second_team_double_points = 1;
    }
    if (first_team_call && !details.first_team_call) {
      selectedData.first_team_call = 1;
    }
    if (second_team_call && !details.second_team_call) {
      selectedData.second_team_call = 1;
    }

    // إرسال البيانات
    dispatch(updateAnswer(selectedData))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "تم تحديث الإجابة ✅");
        navigate("/GameBoard", { state: { updatedGame: res } });
      })
      .catch((err) => {
        toast.error(err || "حدث خطأ");
      });
  };

  const handleEndGame = () => {
    if (!game) return;
    dispatch(endGame({ gameId: details.id, payload: {} }))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "تم انهاء اللعبة");
        navigate("/home");
      })
      .catch((err) => toast.error(err || "فشل إنهاء اللعبة"));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* زر إنهاء اللعب */}
      <div className="flex justify-end gap-4 m-1 text-black">
        <button
          className="text-xl font-bold px-4 py-2 rounded-t-lg shadow-md border border-gray-300 transition-colors"
          onClick={handleEndGame}
        >
          إنهاء اللعب
        </button>

        <button
          className="text-xl font-bold px-4 py-2 rounded-t-lg shadow-md border border-gray-300 transition-colors"
          onClick={() => setModalEndGameOpen(true)}
        >
          خروج
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-12 mb-12 items-stretch">
        {/* Right Panel */}
        <div className="w-full md:w-1/5 border-2 border-[#085E9C] rounded flex flex-col">
          <div className="bg-[#FFC629] rounded-br-2xl rounded-tr-2xl rounded-tl-2xl mx-8 mt-6 flex items-center justify-center">
            <img src="/images/logo.png" className="w-16 h-16" alt="logo" />
          </div>

          <div className="text-center text-[#085E9C] font-bold mt-6">
            <span>{details?.game_name ?? "التحدي"}</span>
            <br />
            <span>{answer?.points ?? 0} نقطة</span>
          </div>

          {/* First Team */}
          <div className="flex items-center justify-around text-white font-bold bg-[#085E9C] rounded py-2 m-4">
            <span>{details?.first_team_name}</span>
            <span className="px-2">{details?.first_team_score}</span>
          </div>

          {/* First Team Icons */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`flex items-center justify-center p-2 rounded ${
                details?.first_team_double_points
                  ? "bg-gray-400 cursor-not-allowed"
                  : first_team_double_points
                  ? "bg-green-500 cursor-pointer"
                  : "bg-[#085E9C] cursor-pointer"
              } ${!isFirstTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isFirstTeamActive &&
                !loading &&
                !details?.first_team_double_points &&
                dispatch(
                  setFirstTeamDoublePoints(first_team_double_points ? 0 : 1)
                )
              }
            >
              <img src="/images/hand.png" className="w-12" alt="hand" />
            </span>

            <span
              className={`flex items-center justify-center p-2 rounded ${
                details?.first_team_call
                  ? "bg-gray-400 cursor-not-allowed"
                  : first_team_call
                  ? "bg-green-500 cursor-pointer"
                  : "bg-[#085E9C] cursor-pointer"
              } ${!isFirstTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isFirstTeamActive &&
                !loading &&
                !details?.first_team_call &&
                dispatch(setFirstTeamCall(first_team_call ? 0 : 1))
              }
            >
              <img src="/images/call.png" className="w-12" alt="call" />
            </span>
          </div>

          {/* Current Team */}
          <div className="flex items-center justify-around font-bold rounded py-2 m-4 border-2 border-[#085E9C] text-[#085E9C] bg-yellow-100">
            <span>الدور الحالي:</span>
            <span className="px-2">
              {isFirstTeamActive
                ? details?.first_team_name
                : isSecondTeamActive
                ? details?.second_team_name
                : "غير محدد"}
            </span>
          </div>

          {/* Second Team */}
          <div className="flex items-center justify-around text-[#085E9C] border font-bold border-[#085E9C] rounded m-4">
            <span className="py-2">{details?.second_team_name}</span>
            <span className="border-r py-2 px-2 border-[#085E9C]">
              {details?.second_team_score}
            </span>
          </div>

          {/* Second Team Icons */}
          <div className="flex items-center justify-center mb-4 gap-4">
            <span
              className={`flex items-center justify-center border p-2 rounded ${
                details?.second_team_double_points
                  ? "bg-gray-400 cursor-not-allowed"
                  : second_team_double_points
                  ? "bg-green-500 cursor-pointer"
                  : "border-[#085E9C] cursor-pointer"
              } ${!isSecondTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isSecondTeamActive &&
                !details?.second_team_double_points &&
                dispatch(
                  setSecondTeamDoublePoints(second_team_double_points ? 0 : 1)
                )
              }
            >
              <img src="/images/hand.png" className="w-8 sm:w-12" alt="hand" />
            </span>
            <span
              className={`flex items-center justify-center border p-2 rounded ${
                details?.second_team_call
                  ? "bg-gray-400 cursor-not-allowed"
                  : second_team_call
                  ? "bg-green-500 cursor-pointer"
                  : "border-[#085E9C] cursor-pointer"
              } ${!isSecondTeamActive ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() =>
                isSecondTeamActive &&
                !details?.second_team_call &&
                dispatch(setSecondTeamCall(second_team_call ? 0 : 1))
              }
            >
              <img src="/images/call.png" className="w-8 sm:w-12" alt="call" />
            </span>
          </div>
        </div>

        {/* Center + Left */}
        <div className="flex flex-col md:flex-row w-full md:w-4/5 border-2 border-[#085E9C] rounded items-stretch">
          {/* Center AwnserPage */}
          <div className="w-full md:w-10/12 p-4">
            <div className="text-center w-full rounded-br">
              <div className="border-2 border-[#848484] text-xl md:text-2xl font-bold p-0">
                {answer?.answer?.text ? (
                  <div className="flex justify-center items-center text-center w-full py-4">
                    {answer.answer.text}
                  </div>
                ) : (
                  <div className="flex justify-center items-center text-center w-full py-4">
                    لا توجد إجابة
                  </div>
                )}
              </div>

              <div className="text-3xl py-6 flex flex-col items-center gap-4 border-2 border-[#848484] min-h-[300px] mt-2">
                <img
                  src={answer?.question?.image || "/images/back2.jpg"}
                  alt="answer"
                  className="mx-auto max-h-96 w-screen object-contain rounded"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/back2.jpg";
                  }}
                />

                {answer?.answer?.audio && (
                  <audio
                    controls
                    src={answer.answer.audio}
                    className="mx-auto"
                  />
                )}

                {answer?.answer?.video && (
                  <video
                    controls
                    src={answer.answer.video}
                    className="mx-auto max-h-60"
                  />
                )}

                {!answer?.answer?.text &&
                  !answer?.question?.image &&
                  !answer?.answer?.audio &&
                  !answer?.answer?.video &&
                  "لا توجد إجابة"}
              </div>
            </div>
          </div>

          {/* Left */}
          <div className="flex flex-col justify-between w-full md:w-2/12 h-full">
            <div
              className="text-center cursor-pointer font-bold text-xl bg-[#085E9C] text-white rounded-br px-4 py-2"
              onClick={() => setIsReportOpen(true)}
            >
              أبلاغ
            </div>

            <div>
              <div className="text-center text-[#085E9C] font-bold m-4">
                مين جاوب
              </div>

              {/* أزرار اختيار الفريق */}
              <div
                className={`text-center cursor-pointer text-[#085E9C] border font-bold border-[#085E9C] rounded px-4 py-2 m-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !loading && handleSelectTeam("first_team")}
              >
                {details?.first_team_name}
              </div>
              <div
                className={`text-center cursor-pointer text-[#085E9C] border font-bold border-[#085E9C] rounded px-4 py-2 m-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !loading && handleSelectTeam("second_team")}
              >
                {details?.second_team_name}
              </div>
              <div
                className={`text-center cursor-pointer text-[#085E9C] border font-bold border-[#085E9C] rounded px-4 py-2 m-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !loading && handleSelectTeam("none")}
              >
                ولا أحد
              </div>

              <div
                className="bg-[#085E9C] cursor-pointer text-center font-bold text-lg text-white rounded-tr px-4 py-2"
                onClick={() => navigate(-1)}
              >
                رجوع للسؤال
              </div>
            </div>
          </div>
        </div>

        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          question_id={answer?.id}
        />

        <EndGameModal
          isOpen={modalEndGameOpen}
          onClose={() => setModalEndGameOpen(false)}
          onExit={() => navigate("/home")}
        />
      </div>
    </div>
  );
};

export default AwnserPage;
