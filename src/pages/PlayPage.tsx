const PlayPage = () => {
  const gameImages = Array(6).fill({ img: '/images/products/p9.png' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 font-Tajawal sm:px-2 sm:py-2">
      <div className="max-w-4xl w-full bg-white border rounded-lg shadow-lg p-6 space-y-6 text-center">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-24 items-center">
          {/* Game Section */}
          <div className="flex flex-col items-center p-2 mt-8 border rounded border-[#085E9C] space-y-2">
            {/* Game Images */}
            <div className="grid grid-cols-2 gap-1 p-2 rounded">
              {gameImages.map((item, index) => (
                <img
                  key={index}
                  src={item.img}
                  alt={`Game card ${index + 1}`}
                  className="w-12 h-12 object-cover rounded"
                />
              ))}
            </div>

            {/* Action Buttons */}
            <button className="w-full bg-white border border-[#085E9C] text-[#085E9C] font-semibold py-1 px-4 rounded hover:bg-blue-50">
              التحدي
            </button>
            <button className="w-full bg-[#085E9C] text-white font-semibold py-1 px-4 rounded hover:bg-[#085E9C]">
              العب
            </button>
          </div>

          {/* Description Section */}
          <div>
            <h2 className="text-xl font-bold text-[#085E9C] mb-8">العابي</h2>
            <p className="text-gray-800 text-[16px] font-[500] leading-loose max-w-xl text-right">
              قد يكون المستخدم اختار خروج من القائمة التي في   (السؤال، الجواب، قائمة الأسئلة)،<br /> أو قد علق التطبيق أو سكر بالخطأ، فتظهر اللعبة هنا ويمكنه اختيار اللعبة وإذا اختار راح يلعب من حيث انتهت اللعبة، ولو لعب وجات شاشة مبروك، خلاص تختفي اللعبة من شاشة العابي.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-6 flex items-center justify-center">
          <button className="w-[400px] px-6 py-2 border border-[#085E9C] text-[#085E9C] rounded hover:bg-blue-50">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
