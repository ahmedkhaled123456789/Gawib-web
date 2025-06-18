
const Footer = () => {
  return (
   <footer className="fixed bottom-0 left-0 w-full bg-[#085E9C] flex justify-between items-center px-12 py-2">
    <div className="flex items-center justify-between gap-6">
   <button  className=" text-3xl text-[#fff] font-bold">☰</button>
        <button><img src="/images/footer/f2.png" alt="Instagram" className="w-8 h-8 " /></button>
        <button><img src="/images/footer/f3.png" alt="TikTok" className="w-8 h-8 " /></button>
    </div>

    <div className="flex items-center justify-between gap-6">
        <button><img src="/images/footer/f4.png" alt="Contact" className="w-8 h-8 bg-white" /></button>
        <button><img src="/images/footer/f5.png" alt="Home" className="w-8 h-8 bg-white" /></button>
        <button><img src="/images/footer/f1.png" alt="Menu" className="w-8 h-8 bg-white" /></button>
    </div>
     

      </footer>
  )
}

export default Footer