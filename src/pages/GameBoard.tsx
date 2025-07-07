import { Link } from "react-router-dom";

const categories = [
    { title: "عدنان ولينا", image: "/images/products/p9.png" ,active: false},

  { title: "الدوري الاوروبي", image: "/images/products/p12.png" ,active: false},
  { title: "اعلام", image: "/public/images/products/p5.png",active: false },
  { title: "باب الحارة", image: "/images/products/p8.png",active: true },
  { title: "عملات", image: "/images/products/p2.png",active: true },
    { title: "معالم", image: "/images/products/p3.png" ,active: true},

];

const GameBoard = () => {
  return (
    <div className="flex flex-col justify-between h-full p-8 lg:p-12 sm:p-4 mb-6">
  {/* Grid of Categories */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-2">
    {categories.map((cat, index) => (
      <div key={index} className={`flex items-center justify-center ${cat.active ? "" : "opacity-[.5]"}`}>
        {/* Left Column - Buttons */}
        <div className="flex flex-col gap-2 h-full">
          {[200, 400, 600].map((val) => (
            <button
              key={`left-${val}`}
              className={`${
                cat.active ? "bg-[#085E9C] text-white" : "border border-[#085E9C] text-[#085E9C]"
              } w-16 sm:w-20 h-16 rounded rounded-br-xl rounded-tl-xl text-xs sm:text-sm font-bold`}
            >
              {val}
            </button>
          ))}
        </div>

        {/* Center - Image & Title */}
        <div className="flex flex-col items-center justify-center border rounded-md border-[#085E9C] w-full h-full p-2 bg-white ">
          <img src={cat.image} alt={cat.title} className="h-24 sm:h-32 w-full object-contain mb-4" />
          <span className="text-sm sm:text-lg shadow-lg text-[#085E9C] border p-2 w-full rounded font-bold text-center">
            {cat.title}
          </span>
        </div>

        {/* Right Column - Buttons */}
        <div className="flex flex-col gap-2 h-full">
          {[200, 400, 600].map((val) => (
            <button
              key={`right-${val}`}
              className={`${
                cat.active ? "bg-[#085E9C] text-white" : "border border-[#085E9C] text-[#085E9C]"
              } w-16 sm:w-20 h-16 rounded rounded-bl-xl rounded-tr-xl text-xs sm:text-sm font-bold`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>

  {/* Players Section */}
  <div className="flex flex-col sm:flex-row justify-between items-center border-t-2 mt-6 pt-4 border-[#085E9C] gap-4 sm:gap-0">
    <PlayerOneScore name="محمد عبدالله" score={2000} />
    <Link to="/home">
      <img src="/images/logo.png" className="h-16 sm:h-24 mx-auto" alt="Logo" />
    </Link>
    <PlayerTwoScore name="علي حسين" score={2400} />
  </div>
</div>

  );
};

const PlayerOneScore = ({ name, score }: { name: string; score: number }) => (
 <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 p-4">
  <span className="font-bold text-xl sm:text-2xl text-[#085E9C]">{name}</span>

  <div className="border border-[#085E9C] rounded w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
    <img src="/images/yyyy.png" alt="yellow" className="w-10 h-10 sm:w-14 sm:h-14" />
  </div>

  <div className="border border-[#085E9C] rounded-md flex items-center">
    <button className="bg-[#FFC629] text-[#085E9C] border border-[#085E9C] font-bold rounded w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl">-</button>
    <span className="w-12 sm:w-16 text-center font-bold text-blue-800 text-base sm:text-lg">{score}</span>
    <button className="bg-[#FFC629] text-[#085E9C] border border-[#085E9C] font-bold rounded w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl">+</button>
  </div>
</div>

);

const PlayerTwoScore = ({ name, score }: { name: string; score: number }) => (
<div className="flex flex-col sm:flex-row items-center gap-4 p-2 text-center sm:text-right">
  {/* Image Container */}
  <div className="border border-[#085E9C] rounded w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
    <img
      src="/images/yyyy.png"
      alt="yellow"
      className="w-12 h-12 sm:w-14 sm:h-14"
    />
  </div>

  {/* Counter Buttons */}
  <div className="border border-[#085E9C] rounded-md flex items-center">
    <button className="bg-[#FFC629] text-[#085E9C] border border-[#085E9C] font-bold w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl">
      -
    </button>
    <span className="w-12 sm:w-16 text-center font-bold text-blue-800 text-lg sm:text-xl">
      {score}
    </span>
    <button className="bg-[#FFC629] text-[#085E9C] border border-[#085E9C] font-bold w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl">
      +
    </button>
  </div>

  {/* Player Name */}
  <span className="font-bold text-[#085E9C] text-lg sm:text-2xl sm:ml-6 mt-2 sm:mt-0">
    {name}
  </span>
</div>


);

export default GameBoard;
