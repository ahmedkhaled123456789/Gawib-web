import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Congratulations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { game } = location.state || {};

  if (!game || !game.data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        لا توجد بيانات للعبة. الرجاء العودة للصفحة الرئيسية.
      </div>
    );
  }

  const {
    first_team_name,
    first_team_score,
    second_team_name,
    second_team_score,
  } = game.data.details;

  const winner =
    first_team_score > second_team_score
      ? first_team_name
      : second_team_score > first_team_score
      ? second_team_name
      : "تعادل";

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="p-6 text-center">
          <div className="text-[#588A17] text-[70px] font-[500] mb-4">
            🎉 مبروك 🎉
          </div>

          <div className="text-xl font-bold mb-4">
            الفائز: <span className="text-[#FF426E]">{winner}</span>
          </div>

          <div className="text-lg font-bold mb-4">النتائج:</div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between border p-4 rounded-md">
              <span className="font-bold">{first_team_name}</span>
              <span className="font-bold">{first_team_score}</span>
            </div>
            <div className="flex justify-between border p-4 rounded-md">
              <span className="font-bold">{second_team_name}</span>
              <span className="font-bold">{second_team_score}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/home")}
            className="mt-8 px-6 py-3 bg-[#085E9C] text-white rounded-lg font-bold"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </>
  );
};

export default Congratulations;
