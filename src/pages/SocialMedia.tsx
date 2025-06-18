import { Mail, MapPin, Phone } from "lucide-react"

const SocialMedia = () => {
  return (
  <div className="min-h-screen  max-w-3xl mx-auto font-sans  p-12">
      {/* العنوان الرئيسي */}
      <h2 className="text-[#085E9C] text-2xl font-bold text-center mb-10">
التواصل الاجتماعي      </h2>

      <div className="flex items-start  ">
       

        {/* معلومات التواصل */}

<div  className="flex items-center justify-between gap-4 mt-40 " >
     <div className="border border-gray-200 rounded px-6 py-6 space-y-6 text-right text-[#085E9C] text-base bg-gray-50 shadow-sm">
          <div className="flex items-center gap-3">
            <MapPin size={20} />
            <span>المملكة العربية السعودية</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={20} />
            <span>info@jawb.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={20} />
            <span>+966505960258</span>
          </div>
        </div>

       
</div>
        
      </div>
    </div>  )
}

export default SocialMedia