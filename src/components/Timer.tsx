import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(85); // 01:25 = 85 ثانية

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 bg-[#085E9C] text-white rounded-br px-2 py-2">
      <img
        src="/images/loop.png"
        className="w-6 h-6 md:w-8 md:h-8"
        alt="loop"
      />
      <span className="text-sm md:text-base">{formatTime(seconds)}</span>
      <img
        src="/images/play.png"
        className="w-6 h-6 md:w-8 md:h-8"
        alt="play"
      />
    </div>
  );
};

export default Timer;
