"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import projectsData from "../../data/projects.json";
import AnimatedHeading from "./AnimatedHeading";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function ProjectSection() {
  return (
    <section className="w-full bg-slate-950 text-white flex flex-col py-10 md:py-24">
      <div className="flex flex-col items-center px-4 mb-16 text-center">
        <AnimatedHeading
          className="text-2xl md:text-3xl lg:text-4xl"
          initialColor="text-brandBlack"
          finalColor="text-brandBlack"
        >
          My Projects
        </AnimatedHeading>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4  relative group/swiper">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full !pb-16"
        >
          {projectsData.map((project) => (
            <SwiperSlide key={project.id} className="h-auto pb-4">
              <Link href={`/projects/${project.id}`} className="block group cursor-pointer h-full flex flex-col">
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden mb-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-2">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-brandYellow transition-colors pr-4">
                      {project.title}
                    </h3>

                  </div>

                  <p className="text-zinc-400 mb-6 line-clamp-2 text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* Category Pill */}
                  <div className="mt-auto flex">
                    <span className="bg-zinc-800 text-zinc-300 text-sm font-semibold px-5 py-2 rounded-full tracking-wide">
                      {project.category}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="custom-prev absolute top-[40%] -translate-y-1/2 -left-4 md:-left-8 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover/swiper:opacity-100 group-hover/swiper:left-0 md:group-hover/swiper:-left-4 transition-all duration-300 hover:bg-brandYellow hover:text-black hover:scale-110 cursor-pointer disabled:opacity-0 hidden md:flex">
          <FaArrowLeft className="text-lg md:text-xl" />
        </button>
        <button className="custom-next absolute top-[40%] -translate-y-1/2 -right-4 md:-right-8 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover/swiper:opacity-100 group-hover/swiper:right-0 md:group-hover/swiper:-right-4 transition-all duration-300 hover:bg-brandYellow hover:text-black hover:scale-110 cursor-pointer disabled:opacity-0 hidden md:flex">
          <FaArrowRight className="text-lg md:text-xl" />
        </button>
      </div>
    </section>
  );
}
