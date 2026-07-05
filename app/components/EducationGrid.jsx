"use client";

import AnimatedHeading from "./AnimatedHeading";
import { FaGraduationCap } from "react-icons/fa6";

export default function EducationGrid({ educationRecords }) {
  return (
    <div className="w-full bg-[#0a0a0a]">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="mb-14">
          <AnimatedHeading className="text-4xl md:text-5xl">
            EDUCATION
          </AnimatedHeading>
        </div>

        <div className="w-full">
          <div className="relative border-l border-zinc-700 ml-4 pl-8 md:pl-12 space-y-12">
            {educationRecords.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-[41px] md:-left-[58px] top-1.5 h-4 w-4 md:h-5 md:w-5 rounded-full border-2 border-brandYellow bg-brandBlack group-hover:bg-brandYellow transition-all duration-300 z-10 shadow-[0_0_10px_rgba(252,235,59,0.3)] group-hover:shadow-[0_0_15px_rgba(252,235,59,0.6)]" />

                {/* Content Box */}
                <div className="bg-brandBlack p-6 md:p-8 rounded-lg border border-zinc-800/80 hover:border-brandYellow/50 transition-all duration-500 shadow-xl relative overflow-hidden">
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl text-white tracking-wide mb-3 leading-snug">
                        {edu.role}
                      </h3>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-zinc-400">
                        <span className="flex items-center gap-2 text-brandYellow font-medium text-lg uppercase tracking-wider">
                          <FaGraduationCap className="text-xl" />
                          <span>{edu.company}</span>
                        </span>
                        {edu.duration && (
                          <>
                            <span className="hidden sm:inline text-zinc-600">
                              •
                            </span>
                            <span className="bg-zinc-800/50 px-3 py-1 rounded-full text-sm font-sans">
                              {edu.duration}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
