import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaBehance,
} from "react-icons/fa6";
import socialLinks from "@/data/social.json";

const iconMap = {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaBehance,
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#282828] text-white flex flex-col items-center py-8 md:py-10 px-4 lg:px-8 relative overflow-hidden">
      {/* Background texture overlay could go here if needed, for now solid dark */}

      {/* Newsletter Section */}
      <div className="flex flex-col items-center mb-12 md:mb-24 max-w-3xl w-full text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl uppercase">
          NASIR&apos;S NEWSLETTER
        </h2>
        <h3 className="text-base sm:text-lg md:text-xl lg:text-3xl uppercase tracking-wide mb-6 md:mb-10">
          SIGN UP FOR MY WEEKLY NEWSLETTER
        </h3>

        <form className="flex flex-col md:flex-row items-end justify-center w-full gap-4 max-w-2xl mx-auto">
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="text-left font-bold uppercase mb-2 ml-1 text-sm tracking-widest"
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-[#333333] border-none focus:outline-none focus:ring-2 focus:ring-[#fceb3b] text-white px-4 py-3 min-h-[50px] transition-all"
            />
          </div>
          <button
            type="button"
            className="w-full md:w-auto bg-[#25d366] hover:bg-[#1db954] text-white font-bold uppercase px-8 py-3 min-h-[50px] rounded-full transition-colors whitespace-nowrap tracking-widest text-sm"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>

      {/* Social Icons Section */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2 max-w-4xl">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <Link
              key={link.name}
              href={link.url}
              target="_blank" rel="noopener noreferrer"
              className={`w-12 h-12 rounded-full flex items-center justify-center ${link.color} hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="text-xl sm:text-2xl" />
            </Link>
          );
        })}
      </div>

      {/* Copyright Links */}
      <div className="flex flex-col items-center justify-center text-xs sm:text-sm text-gray-400 font-sans mt-auto border-t border-zinc-800 pt-6 md:pt-8 w-full">
        <p className="mb-2">© Nasir Uddin 2025. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
