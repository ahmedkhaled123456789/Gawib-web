// GameSetup.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { createGame } from "../store/preGameSlice";
import { useNavigate } from "react-router-dom";

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
  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => (prev < 6 ? prev + 1 : 6));
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => (prev > 1 ? prev - 1 : 1));
  };

 const handleSave = () => {
  const newGame = {
    user_id: "1",
    ids: selectedIds,
    game_name: gameName,
    first_team_name: team1,
    second_team_name: team2,
    first_team_players_count: String(score1),
    second_team_players_count: String(score2),
  };

  dispatch(createGame(newGame))
    .unwrap()
    .then((res) => {
      console.log("Game created successfully ✅", res);
       navigate("/GameBoard", { state: { game: res } });
    })
    .catch((err) => {
      console.error("Error creating game ❌", err);
    });
};


  return (
    <div className="flex flex-col items-center justify-center text-black min-h-screen gap-4">
      <input
        type="text"
        placeholder="اسم اللعبة"
        className="border border-black w-1/2 p-2 placeholder:text-gray-400 text-center rounded"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />

      <div className="flex justify-between items-center gap-12 w-1/2">
        <input
          type="text"
          placeholder="الفريق الأول"
          className="w-1/2 border border-black p-2 placeholder:text-gray-400 text-center rounded"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
        />
        <input
          type="text"
          placeholder="الفريق الثاني"
          className="w-1/2 border border-black placeholder:text-gray-400 p-2 text-center rounded"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center gap-12 w-1/2">
        {[score1, score2].map((score, index) => (
          <div key={index} className="flex justify-center items-center w-1/2">
            <button
              onClick={() => handleDecrement(index === 0 ? setScore1 : setScore2)}
              className="bg-[#FFC629] w-[30%] py-2 font-bold text-[#085E9C] text-2xl"
            >
              -
            </button>
            <input
              type="text"
              className="w-[40%] font-bold text-[#085E9C] py-2 text-center text-2xl border-y"
              value={score}
              readOnly
            />
            <button
              onClick={() => handleIncrement(index === 0 ? setScore1 : setScore2)}
              className="bg-[#FFC629] w-[30%] text-[#085E9C] font-bold py-2 text-2xl"
            >
              +
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-[#085E9C] w-[30%] text-white py-2 px-6 rounded text-lg"
      >
        بدء اللعبة
      </button>
    </div>
  );
};

export default GameSetup;
