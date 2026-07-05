"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaXmark, FaChevronRight } from "react-icons/fa6";
import Footer from "@/app/components/Footer";

// Show sections — each show has a title, description, and featured episodes
const showSections = [
  {
    id: "ask-nasir",
    title: "#AskNasir\nShow",
    tagline: "THE",
    taglineBottom: "SHOW",
    bgColor: "bg-[#3a1518]",
    accentColor: "#e63946",
    description:
      "The #AskNasir Show is a Q&A-style web show in which Nasir provides his direct, one-to-one answers to questions on a wide range of topics. Designed to provide as much value to the viewers as possible, Nasir sources questions from social media. The questions are then read and he provides his answers and advice on topics including web development, software engineering, digital marketing, and much more.",
    episodes: [
      {
        title: "#AskNasir Episode 1: How to Start Web Development From Scratch",
        thumbnail:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
      },
      {
        title: "The Power of Consistency in Brand Building",
        thumbnail:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
        videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
      },
      {
        title: "Answering YOUR Brand Strategy Questions — Episode 34",
        thumbnail:
          "https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80",
        videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
      },
    ],
    watchMoreUrl: "https://youtube.com",
  },
];

export default function TalkShowsPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <main className="flex-1 w-full bg-brandBlack min-h-screen text-white flex flex-col">
      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/heroBG.jpeg"
            alt="Talk Shows Background"
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-brandBlack/50" />
          <div className="absolute inset-0 bg-linear-to-t from-brandBlack via-brandBlack/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-brandBlack/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <div className="text-brandYellow text-6xl md:text-7xl leading-none mb-4 font-serif select-none">
              &ldquo;
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.15] tracking-wide max-w-3xl mb-6">
              There&apos;s no reason in today&apos;s world not to be creating
              content online.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base font-serif max-w-lg">
              Watch Nasir share insights on building a personal brand
              online through his series of original pillar shows.
            </p>
          </div>

          {/* Circular Badge */}
          <div className="absolute right-6 md:right-16 bottom-12 md:bottom-20 hidden md:block">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-brandYellow flex items-center justify-center relative overflow-hidden animate-[badgeSpin_20s_linear_infinite]">
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
                  />
                </defs>
                <text
                  fill="black"
                  fontSize="15"
                  fontWeight="900"
                  letterSpacing="5"
                  textAnchor="start"
                >
                  <textPath href="#circlePath">
                    NASIR VIDEO • EXPERIENCE •
                  </textPath>
                </text>
              </svg>
              <div className="relative z-10 flex items-center justify-center">
                <FaPlay className="text-brandBlack text-2xl lg:text-3xl ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SHOW SECTIONS                               */}
      {/* ═══════════════════════════════════════════ */}
      {showSections.map((show) => (
        <section key={show.id} className={`${show.bgColor} py-20 md:py-28`}>
          <div className="px-4 md:px-6 max-w-7xl mx-auto">
            {/* Episode Thumbnails */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 mb-14">
              {show.episodes.map((ep, i) => (
                <div
                  key={`${show.id}-ep-${i}`}
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(ep.videoUrl)}
                >
                  <div className="relative aspect-video overflow-hidden bg-brandBlack/30 rounded-sm">
                    <Image
                      src={ep.thumbnail}
                      alt={ep.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brandBlack/30 group-hover:bg-brandBlack/50 transition-colors duration-400" />

                    {/* YouTube-style Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="text-white text-sm md:text-base ml-0.5" />
                      </div>
                    </div>

                    {/* Episode Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-brandBlack/80 to-transparent">
                      <p className="text-white/90 text-xs md:text-sm font-serif line-clamp-1">
                        {ep.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Watch More Button */}
            <div className="flex justify-center">
              <Link
                href={show.watchMoreUrl}
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-3 border border-white/30 text-white/80 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-brandBlack transition-all duration-300 rounded-full group"
              >
                Watch More Here
                <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* ═══════════════════════════════════════════ */}
      {/* CTA SECTION                                 */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-brandBlack px-6 md:px-12 lg:px-16 py-24">
        <div className="relative bg-[#1a1a1a] border border-zinc-800/60 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brandYellow" />
          <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl uppercase tracking-wider mb-3">
                Want to be a guest?
              </h3>
              <p className="text-zinc-500 text-base font-serif font-light max-w-lg leading-relaxed">
                We&apos;re always looking for inspiring leaders, entrepreneurs,
                and innovators to feature on our shows. Share your story with
                our audience.
              </p>
            </div>
            <button className="shrink-0 bg-brandYellow text-brandBlack px-10 py-4 text-md transition-all duration-300 hover:bg-yellow-300">
              Apply Now →
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* ═══════════════════════════════════════════ */}
      {/* VIDEO MODAL                                 */}
      {/* ═══════════════════════════════════════════ */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-brandBlack/95 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-8 text-white/50 hover:text-white text-3xl transition-colors z-110"
          >
            <FaXmark />
          </button>

          <div
            className="w-[92vw] max-w-[1200px] aspect-video relative z-110"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "vidIn 0.3s ease-out" }}
          >
            <iframe
              className="w-full h-full"
              src={`${activeVideo}?autoplay=1`}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes badgeSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes vidIn {
          from {
            opacity: 0;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
