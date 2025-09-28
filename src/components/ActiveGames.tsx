import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { getActiveGames } from "../store/activeGameSlic";
import { Loader2, Search, ArrowUp } from "lucide-react";

const ActiveGames = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { games, loading, error } = useSelector(
    (state: RootState) => state.activeGames
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    dispatch(getActiveGames());
  }, [dispatch]);

  // مراقبة الـ scroll لاظهار زر "اطلع لفوق"
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScroll(true);
      else setShowScroll(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateToGameBoard = (selectedMatch: any, selectedGame: any) => {
    navigate("/GameBoard", {
      state: { gameData: selectedMatch, selectedGame },
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-[#085E9C]" />
      </div>
    );

  if (error) return <div className="p-4 text-red-500">خطأ: {error}</div>;

  if (!games || games.length === 0) {
    return <div className="p-4">لا توجد ألعاب نشطة حالياً</div>;
  }

  const filteredGames = games.filter((match: any) =>
    match.details?.game_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-6 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* حقل البحث */}
      <div className="w-full max-w-md mb-8 relative">
        <input
          type="text"
          placeholder=" ابحث عن اسم اللعبة "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#085E9C]"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {filteredGames.length === 0 ? (
        <div className="p-4">لا توجد نتائج مطابقة</div>
      ) : (
        filteredGames.map((match: any, index: number) => (
          <div
            key={index}
            className="w-full bg-white border border-[#085E9C] rounded-2xl shadow-md p-6 mb-12"
          >
            {match.details && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#085E9C] mb-4">
                  {match.details.game_name}
                </h2>
                <div className="flex justify-around items-center text-lg font-semibold">
                  <div>
                    <p className="text-gray-600">
                      {match.details.first_team_name}
                    </p>
                    <p className="text-xl text-[#085E9C]">
                      {match.details.first_team_score}
                    </p>
                  </div>
                  <span className="text-gray-400">vs</span>
                  <div>
                    <p className="text-gray-600">
                      {match.details.second_team_name}
                    </p>
                    <p className="text-xl text-[#085E9C]">
                      {match.details.second_team_score}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* كروت الألعاب */}
            <h3 className="text-lg font-bold mb-6 text-[#085E9C]">الألعاب</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {match.games.map((game: any) => (
                <div
                  key={game.id}
                  onClick={() => handleNavigateToGameBoard(match, game)}
                  className="relative cursor-pointer hover:scale-105 transform transition duration-300"
                >
                  <div className="bg-white border border-[#085E9C] rounded-xl shadow-lg overflow-hidden pb-4 text-center w-full">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F6F1EF] border border-[#085E9C] rounded-tr-3xl rounded-bl-3xl px-8 py-2 text-[#085E9C] font-bold text-sm shadow">
                      {game.questions.length} سؤال
                    </div>

                    <div className="mt-10 px-4">
                      {game.image ? (
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-32 object-contain"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100"></div>
                      )}
                    </div>

                    <div
                      className="mt-6 bg-gray-100 rounded-lg mx-4 py-2 font-bold text-[#085E9C] shadow-inner"
                      title={game.name}
                    >
                      {game.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* زر العودة للأعلى */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#085E9C] text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          title="العودة للأعلى"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ActiveGames;
