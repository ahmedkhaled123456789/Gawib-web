interface FooterProps {
  selectedIds?: string[];
  allGames?: { id: string; name: string; image: string }[];
}

const Footer: React.FC<FooterProps> = ({ selectedIds, allGames }) => {
  const selectedGames =
    allGames?.filter((game) => selectedIds?.includes(game.id)) || [];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#085E9C] flex justify-between items-center px-3 sm:px-6 py-2 text-white">
      {/* الجزء الشمال */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button className="text-xl sm:text-3xl font-bold">☰</button>
        <button>
          <img
            src="/images/footer/f5.png"
            alt="Home"
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white"
          />
        </button>
        <button>
          <img
            src="/images/footer/f4.png"
            alt="Contact"
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white"
          />
        </button>
      </div>

      {/* صور الألعاب المختارة */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto max-w-[200px] sm:max-w-md md:max-w-xl px-2 scroll-smooth custom-scrollbar">
        {selectedGames.length > 0 ? (
          selectedGames.map((game) => (
            <img
              key={game.id}
              src={game.image}
              alt={game.name}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded"
            />
          ))
        ) : (
          <span className="text-[10px] sm:text-sm">لا يوجد ألعاب مختارة</span>
        )}
      </div>

      {/* الجزء اليمين */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button>
          <img
            src="/images/footer/f3.png"
            alt="TikTok"
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8"
          />
        </button>
        <button>
          <img
            src="/images/footer/f2.png"
            alt="Instagram"
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8"
          />
        </button>
        <button>
          <img
            src="/images/footer/f1.png"
            alt="Menu"
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
