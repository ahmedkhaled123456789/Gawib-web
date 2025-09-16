interface FooterProps {
  selectedIds: string[];
  allGames?: { id: string; name: string; image: string }[];
}

const Footer: React.FC<FooterProps> = ({ selectedIds, allGames }) => {
  const selectedGames =
    allGames?.filter((game) => selectedIds.includes(game.id)) || [];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#085E9C] flex justify-between items-center px-6 py-2 text-white">
      <div className="flex items-center gap-6">
        <button className="text-3xl font-bold">☰</button>
        <button>
          <img
            src="/images/footer/f5.png"
            alt="Home"
            className="w-8 h-8 bg-white"
          />
        </button>
        <button>
          <img
            src="/images/footer/f4.png"
            alt="Contact"
            className="w-8 h-8 bg-white"
          />
        </button>
      </div>

      {/* صور الألعاب المختارة */}
      <div className="flex items-center gap-4 overflow-x-auto max-w-xs">
        {selectedGames.length > 0 ? (
          selectedGames.map((game) => (
            <img
              key={game.id}
              src={game.image}
              alt={game.name}
              className="w-10 h-10 object-cover rounded"
            />
          ))
        ) : (
          <span>لا يوجد ألعاب مختارة</span>
        )}
      </div>

      <div className="flex items-center gap-6">
        <button>
          <img src="/images/footer/f3.png" alt="TikTok" className="w-8 h-8" />
        </button>
        <button>
          <img
            src="/images/footer/f2.png"
            alt="Instagram"
            className="w-8 h-8"
          />
        </button>
        <button>
          <img
            src="/images/footer/f1.png"
            alt="Menu"
            className="w-8 h-8 bg-white"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
