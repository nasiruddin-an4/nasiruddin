"use client";

import { useState } from "react";
import { FaPlay, FaXmark } from "react-icons/fa6";
import LegacySection from "./components/LegacySection";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import ReadThisSection from "./components/ReadThisSection";
import Footer from "./components/Footer";


export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <main className="flex-1 w-full flex flex-col relative bg-brandBlack">
        {/* Hero Image Section */}
        <div className="flex-1 min-h-[50vh] md:min-h-screen w-full flex flex-col justify-end pb-6 px-8 md:px-16 relative bg-brandBlack overflow-hidden">
          {/* Background Image with horizontal flip */}
          <div
            className="absolute inset-0 bg-cover bg-right md:bg-center"
            style={{ backgroundImage: "url('/nasirHeroBG.png')" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-brandBlack/50 to-transparent pointer-events-none" />

          {/* Content over image */}
          <div className="container mx-auto px-2 lg:px-8 relative z-10 w-full mb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-24 w-full">
              <div className="w-full md:w-3/5">

                <h1 className="text-left font-bold drop-shadow-xl flex flex-col gap-2 md:gap-4">
                  <span className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
                    Nasir Uddin
                  </span>
                  <span className="text-zinc-200 text-lg sm:text-xl md:text-3xl lg:text-4xl font-normal leading-snug max-w-4xl">
                    Software Engineer <span className="font-light italic text-zinc-400">&</span> Full-Stack Digital Marketer Building Impactful Digital Experiences.
                  </span>
                </h1>
              </div>

              <div className="w-full md:w-2/5 justify-start md:justify-center hidden md:flex">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="flex items-center justify-center w-[80px] h-[80px] rounded-full border-[3px] border-white text-white hover:bg-white hover:text-brandBlack transition-all shrink-0 group md:mt-0 cursor-pointer hover:scale-110 duration-300"
                >
                  <FaPlay className="text-[28px] ml-2 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Project Section */}
        <ProjectSection />

        {/* Legacy Section */}
        {/* <LegacySection /> */}

        {/* Read This Section */}
        <ReadThisSection />

        {/* Footer Section */}
        <Footer />
      </main>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brandBlack">
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition-colors z-60"
          >
            <FaXmark />
          </button>

          <div className="w-full h-auto max-h-screen md:w-[90vw] md:max-w-[1400px] aspect-video relative z-50 flex items-center justify-center">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
