import CategoryGrid from "./CategoryGrid";

const HeroSection = () => {
  return (
    <section className="text-center py-6  mt-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl   text-[#085E9C] mb-6">
            استمتع بوقتك واللعب مع جاوب
          </h1>
          <p className="text-black text-md leading-relaxed max-w-3xl mx-auto">
            بإمكانك اختيار أحد المجموعات للتوجه مباشرة للفئات الخاصة بها، بعد تحديد الفئة يمكنك اختيار السهم لبدء اللعب
            <br />
            واختيار مجموعة أخرى وهكذا، اختيار الأخير يمكنك التوجه للفئات مباشرة
          </p>
        </div>
<CategoryGrid/>

        <div className="text-center mt-8">
          <p className="text-black text-md ">
            من بين العديد من الفئات المسلية والمفيدة لإثراء معارفك اختر 6 منها وتحدى خصومك
          </p>
        </div>
    </section>
  );
};

export default HeroSection;
