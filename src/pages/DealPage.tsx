import { Link } from "react-router-dom"

const DealPage = () => {
  return (
            <div className="flex items-center justify-center min-h-screen p-12 sm:px-2 sm:py-2">
  <div className="  max-w-md mx-auto font-Tajawal mt-12">
                <h2 className="text-[#085E9C] font-bold  text-center text-3xl mb-6"> عملية ناجحة بمبلغ 130 </h2>

        <div className=" flex flex-col gap-16">
<p className="text-green-600  text-center px-8 py-8 shadow border rounded border-gray-200  text-lg">
           شكراً، معاملة ناجحه
            </p>
            <button className="border border-[#085E9C] text-[#085E9C] px-8 py-2 rounded hover:bg-blue-50 transition">
              <Link to={"/home"}>
              الرئيسية
              </Link>
            </button>

             
          </div>
</div>
            </div>

    
  )
}

export default DealPage