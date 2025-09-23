import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { createGame, firstGame } from "../store/preGameSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface GameSetupProps {
  selectedIds: string[];
}

const GameSetup: React.FC<GameSetupProps> = ({ selectedIds }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [gameName, setGameName] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [score1, setScore1] = useState(1);
  const [score2, setScore2] = useState(1);
  const navigate = useNavigate();

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => setter((prev) => (prev < 6 ? prev + 1 : 6));

  const handleDecrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => setter((prev) => (prev > 1 ? prev - 1 : 1));

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleSave = () => {
    if (!gameName.trim() || !team1.trim() || !team2.trim()) {
      const errors: string[] = [];
      if (!gameName.trim()) errors.push("⚠️ اسم اللعبة مطلوب");
      if (!team1.trim()) errors.push("⚠️ اسم الفريق الأول مطلوب");
      if (!team2.trim()) errors.push("⚠️ اسم الفريق الثاني مطلوب");

      toast.error(errors.join(" • "));
      return;
    }

    if (!user) {
      toast.error("لم يتم العثور على المستخدم");
      return;
    }

    // body الأساسي (من غير ids)
    const baseGameData = {
      game_name: gameName,
      first_team_name: team1,
      second_team_name: team2,
      first_team_players_count: String(score1),
      second_team_players_count: String(score2),
    };

    // ✅ لو أول مرة يلعب → firstGame بس
    if (user.is_first_game === true) {
      dispatch(firstGame(baseGameData))
        .unwrap()
        .then((res: any) => {
          console.log("✅ firstGame response:", res);

          // تحديث اليوزر في localStorage
          const updatedUser = { ...user, is_first_game: true };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          toast.success(res?.message || "تم تسجيل أول لعبة بنجاح");

          // ❌ مفيش createGame هنا
          navigate("/GameBoard", { state: { game: res } });
        })
        .catch((err: any) => {
          toast.error(err || "حدث خطأ أثناء تشغيل أول لعبة");
          console.error("❌ firstGame error:", err);
        });
    } else {
      // ✅ لو لعب قبل كده → على طول createGame
      createNewGame(baseGameData);
    }
  };

  const createNewGame = (baseGameData: any) => {
    const newGame = {
      ...baseGameData,
      ids: selectedIds,
    };

    dispatch(createGame(newGame))
      .unwrap()
      .then((res: any) => {
        console.log("✅ Game created successfully:", res);
        toast.success(res?.message || "تم إنشاء اللعبة بنجاح");
        navigate("/GameBoard", { state: { game: res } });
      })
      .catch((err: any) => {
        const backendMessage =
          err?.response?.data?.message || err?.message || "اختار ألعاب صحيحة";
        toast.error(backendMessage);
        console.error("❌ Error creating game:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center text-black min-h-screen gap-4 px-4">
      {/* اسم اللعبة */}
      <input
        type="text"
        placeholder="اسم اللعبة"
        className="border border-black w-full max-w-xl p-2 placeholder:text-gray-400 text-center rounded"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />

      {/* أسماء الفرق */}
      <div className="flex flex-row justify-between items-center gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="الفريق الأول"
          className="flex-1 min-w-[120px] border border-black p-2 placeholder:text-gray-400 text-center rounded"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
        />
        <input
          type="text"
          placeholder="الفريق الثاني"
          className="flex-1 min-w-[120px] border border-black placeholder:text-gray-400 p-2 text-center rounded"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        />
      </div>

      {/* عدد اللاعبين */}
      <div className="flex flex-row justify-between items-center gap-4 w-full max-w-xl">
        {[score1, score2].map((score, index) => (
          <div
            key={index}
            className="flex justify-center items-center flex-1 min-w-[140px]"
          >
            <button
              onClick={() =>
                handleDecrement(index === 0 ? setScore1 : setScore2)
              }
              className="bg-[#FFC629] w-1/3 py-2 font-bold text-[#085E9C] text-2xl"
            >
              -
            </button>
            <input
              type="text"
              className="w-1/3 font-bold text-[#085E9C] py-2 text-center text-2xl border-y"
              value={score}
              readOnly
            />
            <button
              onClick={() =>
                handleIncrement(index === 0 ? setScore1 : setScore2)
              }
              className="bg-[#FFC629] w-1/3 text-[#085E9C] font-bold py-2 text-2xl"
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* زر بدء اللعبة */}
      <button
        onClick={handleSave}
        className="bg-[#085E9C] w-full max-w-sm text-white py-2 px-6 rounded text-lg"
      >
        بدء اللعبة
      </button>
    </div>
  );
};

export default GameSetup;
