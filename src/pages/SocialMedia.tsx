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

  // ✅ فلترة البيانات
  const socialOnly = socialLinks?.data?.filter(
    (item) =>
      !item.name?.toLowerCase().includes("contact_email") &&
      !item.name?.toLowerCase().includes("phone") &&
      !item.name?.toLowerCase().includes("address")
  );

  const contactInfo = socialLinks?.data?.filter(
    (item) =>
      item.name?.toLowerCase().includes("contact_email") ||
      item.name?.toLowerCase().includes("phone") ||
      item.name?.toLowerCase().includes("address")
  );

  console.log(contactInfo)
   return (
    <div className="min-h-screen mx-auto font-Tajawal p-12">
      {/* العنوان الرئيسي */}
      <h2 className="text-[#085E9C] text-2xl font-bold text-center mb-24">
        التواصل الاجتماعي
      </h2>

      {/* ✅ روابط السوشيال */}
      <div className="grid grid-cols-[repeat(7,minmax(70px,1fr))] gap-2">
        {socialOnly?.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <img
              src={`https://test.jawib.net/storage/${item.icon}`}
              alt={item.name || "social"}
              className="w-[100px] object-contain mx-auto"
            />
          </a>
        ))}
      </div>



      {/* ✅ معلومات التواصل */}


  <div className=" w-full flex items-start">
 <div className=" w-auto font-bold  mt-40 ">
          <div className="  border border-gray-200 rounded px-6 py-12 space-y-6 text-right text-[#085E9C]  bg-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <img src="/images/3g.png" className="w-6 h-6" alt="" />
              <span className="text-2xl">{contactInfo && contactInfo[2] ? contactInfo[2].url : ""}  </span>
          </div>
            <div className="flex items-center gap-3">
              <img src="/images/1g.png" className="w-6 h-6" alt="" />
              <span className="text-2xl">{contactInfo && contactInfo[0] ? contactInfo[0].url : ""}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/2g.png" className="w-6 h-6" alt="" />
              <span className="text-2xl">{contactInfo && contactInfo[1] ? contactInfo[1].url : ""}</span>
            </div>
          </div>
        </div>
        </div>

      {/* <div className="w-full flex items-start">
        <div className="w-[400px] font-bold mt-40">
          <div className="border border-gray-200 rounded px-6 py-12 space-y-6 text-right text-[#085E9C] bg-gray-100 shadow-sm">
            {contactInfo?.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={`https://test.jawib.net/storage/${item.icon}`}
                  className="w-6 h-6"
                  alt=""
                />
                <span className="text-2xl">{item.url}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SocialMedia;
