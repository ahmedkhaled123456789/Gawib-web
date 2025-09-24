import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getActiveGames } from "../store/ActiveGameSlic";

const ActiveGames = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { games, loading, error } = useSelector(
    (state: RootState) => state.activeGames
  );

  useEffect(() => {
    dispatch(getActiveGames());
  }, [dispatch]);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;

  console.log("Rendering ActiveGames with games:", games);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الألعاب النشطة</h2>
      {games.length === 0 ? (
        <div>لا توجد ألعاب نشطة حالياً</div>
      ) : (
        <ul className="space-y-2">
          {games.map((game) => (
            <li key={game.id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{game.name }</h3>
              <p>حالة اللعبة: {game.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveGames;
