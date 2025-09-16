/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  setFirstTeamDoublePoints,
  setSecondTeamDoublePoints,
} from "../store/gameFeaturesSlice";

const GameBoard = () => {
  const location = useLocation();
  const { game: gameFromSetup, updatedGame } = location.state || {};
  const game = updatedGame || gameFromSetup;

  console.log("GameBoard location.state:", game);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { first_team_double_points, second_team_double_points } = useSelector(
    (state: RootState) => state.gameFeatures
  );

  if (!game || !game.data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        لا توجد بيانات للعبة. الرجاء العودة للصفحة الرئيسية.
      </div>
    );
  }

  // handle question click
  const handleClick = (data: any) => {
    // لو متجاوب قبل كده، ميسمحش بالفتح
    if (!data || data.is_answered) return;
    navigate("/QuestionPage", {
      state: { question: data, game: game },
    });
  };

  return (
    <div className="flex flex-col justify-between h-full p-8 lg:p-12 sm:p-4 mb-6">
      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-2">
        {game.data.games.map((cat: any) => (
          <div key={cat.id} className="flex items-center justify-center">
            {/* Left buttons */}
            <div className="flex  flex-col-reverse gap-2 h-full">
              {Array(3)
                .fill(null)
                .map((_, idx) => {
                  const val = cat?.questions?.[idx + 3];
                  return (
                    <button
                      key={`left-${idx}`}
                      className={`w-16 sm:w-20 h-16 rounded rounded-br-xl rounded-tl-xl text-xs sm:text-sm font-bold
                        ${
                          val?.is_answered
                            ? "bg-gray-200 text-[#085E9C] cursor-not-allowed text-2xlfont-bold "
                            : "bg-[#085E9C] text-white hover:bg-blue-700"
                        }`}
                      onClick={() => handleClick(val)}
                      disabled={val?.is_answered}
                    >
                      {val?.is_answered ? val?.points : val?.points ?? "-"}
                    </button>
                  );
                })}
            </div>

            {/* Center Category Card */}
            <div className="flex flex-col items-center justify-center border rounded-md border-[#085E9C] w-full h-full p-2 bg-white">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-24 sm:h-32 w-full object-contain mb-4"
              />
              <span className="text-sm sm:text-lg shadow-lg text-[#085E9C] border p-2 w-full rounded font-bold text-center">
                {cat.name}
              </span>
            </div>

            {/* Right buttons */}
            <div className="flex flex-col gap-2 h-full">
              {Array(3)
                .fill(null)
                .map((_, idx) => {
                  const val = cat?.questions?.[idx];
                  return (
                    <button
                      key={`right-${idx}`}
                      className={`w-16 sm:w-20 h-16  rounded rounded-bl-xl rounded-tr-xl text-xs sm:text-sm font-bold
                        ${
                          val?.is_answered
                            ? "bg-gray-200 text-[#085E9C] cursor-not-allowed text-2xlfont-bold "
                            : "bg-[#085E9C] text-white hover:bg-blue-700"
                        }`}
                      onClick={() => handleClick(val)}
                      disabled={val?.is_answered}
                    >
                      {val?.is_answered ? val?.points : val?.points ?? "-"}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Players Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t-2 mt-6 pt-4 border-[#085E9C] gap-4 sm:gap-0">
        <PlayerScore
          name={game.data.details.first_team_name}
          score={game.data.details.first_team_score}
          active={game.data.details.current_team === 1}
          isDouble={first_team_double_points === 1}
          onToggleDouble={() =>
            dispatch(
              setFirstTeamDoublePoints(first_team_double_points === 1 ? 0 : 1)
            )
          }
        />
        <Link to="/home">
          <img
            src="/images/logo.png"
            className="h-16 sm:h-24 mx-auto"
            alt="Logo"
          />
        </Link>
        <PlayerScore
          name={game.data.details.second_team_name}
          score={game.data.details.second_team_score}
          active={game.data.details.current_team === 2}
          isDouble={second_team_double_points === 1}
          onToggleDouble={() =>
            dispatch(
              setSecondTeamDoublePoints(second_team_double_points === 1 ? 0 : 1)
            )
          }
        />
      </div>
    </div>
  );
};

const PlayerScore = ({
  name,
  score,
  active,
  isDouble,
  onToggleDouble,
}: {
  name: string;
  score: number;
  active: boolean;
  isDouble: boolean;
  onToggleDouble: () => void;
}) => (
  <div
    className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-2 p-4 transition-all duration-300 ${
      active ? "opacity-100 scale-105" : "opacity-40 pointer-events-none"
    }`}
  >
    <span className="font-bold text-xl sm:text-2xl text-[#085E9C]">{name}</span>

    {/* Double Point */}
    <div
      className={`border border-[#085E9C] rounded w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer ${
        isDouble ? "bg-yellow-300" : "bg-white"
      }`}
      onClick={onToggleDouble}
    >
      <img
        src="/images/yyyy.png"
        alt="yellow"
        className="w-10 h-10 sm:w-14 sm:h-14"
      />
    </div>

    {/* Score Control */}
    <div className="border border-[#085E9C] rounded-md flex items-center">
      <button className="bg-[#FFC629] text-[#085E9C] border border-[#085E9C] font-bold rounded w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl">
        -
      </button>
      <span className="w-12 sm:w-16 text-center font-bold text-blue-800 text-base sm:text-lg">
        {score}
      </span>
      <button className="bg-[#FFC629] text-[#085E9C] border border-[#085E9C] font-bold rounded w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl">
        +
      </button>
    </div>
  </div>
);

export default GameBoard;
