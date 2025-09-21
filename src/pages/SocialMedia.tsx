import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getSocialLinks } from "../store/SocialLinksSlice";

const SocialMedia = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { socialLinks } = useSelector((state: RootState) => state.social);

  useEffect(() => {
    dispatch(getSocialLinks());
  }, [dispatch]);

  const socialOnly = socialLinks?.filter(
    (item: { name: string }) =>
      !item.name?.toLowerCase().includes("contact_email") &&
      !item.name?.toLowerCase().includes("phone") &&
      !item.name?.toLowerCase().includes("address")
  );

  const contactInfo = socialLinks?.filter(
    (item: { name: string }) =>
      item.name?.toLowerCase().includes("contact_email") ||
      item.name?.toLowerCase().includes("phone") ||
      item.name?.toLowerCase().includes("address")
  );

  return (
    <div className="min-h-screen mx-auto font-Tajawal p-12">
      <h2 className="text-[#085E9C] text-2xl font-bold text-center mb-24">
        التواصل الاجتماعي
      </h2>

      {/* ✅ روابط السوشيال (Responsive Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 justify-items-center">
        {socialOnly?.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110 flex items-center justify-center"
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src={`https://test.jawib.net/storage/${item.icon}`}
                alt={item.name || "social"}
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        ))}
      </div>

      {/* ✅ معلومات التواصل */}
      <div className="w-full flex items-center justify-center mt-3">
        <div className="w-auto font-bold mt-40">
          <div className="border border-gray-200 rounded px-6 py-12 space-y-6 text-right text-[#085E9C] bg-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <img src="/images/3g.png" className="w-6 h-6" alt="" />
              <span className="text-2xl">{contactInfo?.[2]?.url || ""}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/1g.png" className="w-6 h-6" alt="" />
              <span className="text-2xl">{contactInfo?.[0]?.url || ""}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/2g.png" className="w-6 h-6" alt="" />
              <span className="text-2xl">{contactInfo?.[1]?.url || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
