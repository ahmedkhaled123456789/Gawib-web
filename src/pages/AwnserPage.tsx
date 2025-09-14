// src/pages/AwnserPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { updateAnswer } from "../store/answerSlice";
import {
  setFirstTeamCall,
  setSecondTeamCall,
  setFirstTeamDoublePoints,
  setSecondTeamDoublePoints,
} from "../store/gameFeaturesSlice";
import { toast } from "sonner";

const AwnserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answer, game } = location.state || {};
  const dispatch = useDispatch<AppDispatch>();

  // Redux states
  const { loading } = useSelector((state: RootState) => state.answer);
  const {
    first_team_call,
    second_team_call,
    first_team_double_points,
    second_team_double_points,
  } = useSelector((state: RootState) => state.gameFeatures);

  const handleSelectTeam = (team: "first_team" | "second_team" | "none") => {
    if (loading) return;

    const questionPoints = answer?.points || 0;
    let firstTeamScore = game?.data?.details?.first_team_score || 0;
    let secondTeamScore = game?.data?.details?.second_team_score || 0;
    let nextTeam = game?.data?.details?.current_team || 1;

    if (team === "first_team") {
      let pointsToAdd = first_team_double_points
        ? questionPoints * 2
        : questionPoints;
      firstTeamScore += pointsToAdd;
      nextTeam = 2;
    } else if (team === "second_team") {
      let pointsToAdd = second_team_double_points
        ? questionPoints * 2
        : questionPoints;
      secondTeamScore += pointsToAdd;
      nextTeam = 1;
    }

    const selectedData = {
      id: answer?.id,
      question_id: answer?.question?.id,
      who_answered: team === "first_team" ? 1 : team === "second_team" ? 2 : 0,
      first_team_score: firstTeamScore,
      second_team_score: secondTeamScore,
      current_team: nextTeam,
      first_team_double_points,
      second_team_double_points,
      first_team_call,
      second_team_call,
    };

    dispatch(updateAnswer(selectedData))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "تم تحديث الإجابة ✅");

        const updatedGame = {
          ...game,
          data: {
            ...game.data,
            details: {
              ...game.data.details,
              current_team: res.current_team || nextTeam,
              first_team_score: res.first_team_score || firstTeamScore,
              second_team_score: res.second_team_score || secondTeamScore,
              first_team_double_points:
                res.first_team_double_points ?? first_team_double_points,
              second_team_double_points:
                res.second_team_double_points ?? second_team_double_points,
              first_team_call: res.first_team_call ?? first_team_call,
              second_team_call: res.second_team_call ?? second_team_call,
            },
          },
        };

        navigate("/GameBoard", { state: { game: updatedGame } });
      })
      .catch((err) => {
        toast.error(err || "حدث خطأ");
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-12 mb-12 items-stretch">
      {/* Right Panel */}
      <div className="w-full md:w-1/5 border-2 border-[#085E9C] rounded flex flex-col">
        <div className="bg-[#FFC629] rounded-br-2xl rounded-tr-2xl rounded-tl-2xl mx-8 mt-6 flex items-center justify-center">
          <img src="/images/logo.png" className="w-16 h-16" alt="logo" />
        </div>
        <div className="text-center text-[#085E9C] font-bold mt-6">
          <span>{game?.data?.details?.game_name ?? "التحدي"}</span>
          <br />
          <span>{answer?.points ?? 0} نقطة</span>
        </div>

        {/* الفريق الأول */}
        <div className="flex items-center justify-around text-white font-bold bg-[#085E9C] rounded py-2 m-4">
          <span>{game?.data?.details?.first_team_name}</span>
          <span className="px-2">{game?.data?.details?.first_team_score}</span>
        </div>

        {/* أيقونات الفريق الأول */}
        <div className="flex items-center justify-center gap-4">
          <span
            className={`flex items-center justify-center p-2 rounded cursor-pointer ${
              first_team_double_points ? "bg-green-500" : "bg-[#085E9C]"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() =>
              !loading &&
              dispatch(
                setFirstTeamDoublePoints(first_team_double_points ? 0 : 1)
              )
            }
          >
            <img src="/images/hand.png" className="w-12" alt="hand" />
          </span>
          <span
            className={`flex items-center justify-center p-2 rounded cursor-pointer ${
              first_team_call ? "bg-green-500" : "bg-[#085E9C]"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() =>
              !loading && dispatch(setFirstTeamCall(first_team_call ? 0 : 1))
            }
          >
            <img src="/images/call.png" className="w-12" alt="call" />
          </span>
        </div>

        {/* الفريق الثاني */}
        <div className="flex items-center justify-around text-[#085E9C] border font-bold border-[#085E9C] rounded m-4">
          <span className="py-2">{game?.data?.details?.second_team_name}</span>
          <span className="border-r py-2 px-2 border-[#085E9C]">
            {game?.data?.details?.second_team_score}
          </span>
        </div>

        {/* أيقونات الفريق الثاني */}
        <div className="flex items-center justify-center mb-2 gap-4">
          <span
            className={`flex items-center justify-center p-2 rounded cursor-pointer ${
              second_team_double_points ? "bg-green-500" : "bg-[#085E9C]"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() =>
              !loading &&
              dispatch(
                setSecondTeamDoublePoints(second_team_double_points ? 0 : 1)
              )
            }
          >
            <img src="/images/hand.png" className="w-12" alt="hand" />
          </span>
          <span
            className={`flex items-center justify-center p-2 rounded cursor-pointer ${
              second_team_call ? "bg-green-500" : "bg-[#085E9C]"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() =>
              !loading && dispatch(setSecondTeamCall(second_team_call ? 0 : 1))
            }
          >
            <img src="/images/call.png" className="w-12" alt="call" />
          </span>
        </div>
      </div>

      {/* Center + Left */}
      <div className="flex flex-col md:flex-row w-full md:w-4/5 border-2 border-[#085E9C] rounded items-stretch">
        {/* Center */}
        <div className="w-full md:w-10/12 p-4">
          <div className="text-center w-full border border-black text-black rounded">
            <div className="text-xl py-8">
              {answer?.answer?.text ?? "لا توجد إجابة"}
            </div>
          </div>

          <div className="mt-4 w-full py-3 px-2 border border-black text-black rounded">
            <div className="flex items-center justify-center w-full h-[300px]">
              {answer?.question?.image ? (
                <img
                  src={answer.question.image}
                  className="h-full w-full object-contain rounded"
                  alt="question"
                />
              ) : (
                <img
                  src="/images/back2.jpg"
                  className="h-full w-full object-cover rounded"
                  alt="default"
                />
              )}
            </div>
          </div>
        </div>

        {/* Left */}
        <div className="flex flex-col justify-between w-full md:w-2/12 h-full">
          <div className="text-center cursor-pointer font-bold text-xl bg-[#085E9C] text-white rounded-br px-4 py-2">
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
              {game?.data?.details?.first_team_name}
            </div>
            <div
              className={`text-center cursor-pointer text-[#085E9C] border font-bold border-[#085E9C] rounded px-4 py-2 m-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !loading && handleSelectTeam("second_team")}
            >
              {game?.data?.details?.second_team_name}
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
    </div>
  );
};

export default AwnserPage;
