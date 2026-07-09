"use client";

import { FaDownload } from "react-icons/fa";

export default function PrintButton() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button
      onClick={handleDownload}
      className="group relative cursor-pointer flex items-center gap-3 bg-brandYellow text-brandBlack px-8 py-4 rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(234,179,8,0.2)]"
    >
      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
      <FaDownload className="relative z-10 text-xl" />
      <span className="relative z-10">Download CV</span>
    </button>
  );
}
