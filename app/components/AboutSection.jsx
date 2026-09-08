"use client";

import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-brandBlack text-white flex flex-col py-10 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Image Column */}
          <motion.div
            className="w-full md:w-1/2 relative order-2 md:order-1 mt-8 md:mt-0"
            variants={imageVariants}
          >
            <div className="relative w-full aspect-square md:aspect-4/5 overflow-hidden rounded-lg">
              <Image
                src="/about_img.png"
                alt="Nasir Uddin — Software Engineer and Full-Stack Digital Marketer"
                fill
                priority
                className="object-cover object-top transition-all duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Text Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center order-1 md:order-2">
            <motion.div variants={itemVariants} className="mb-2 inline-block">
              <AnimatedHeading
                className="text-2xl md:text-3xl lg:text-4xl"
                initialColor="text-brandBlack"
                finalColor="text-brandBlack"
              >
                ABOUT ME
              </AnimatedHeading>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide font-serif md:font-sans">
              <p>
                Nasir Uddin is a Software Engineer and Full-Stack Digital
                Marketer based in Dhaka, Bangladesh, currently working at
                Betopia Group, with experience in developing modern web
                applications, corporate websites, enterprise dashboards, and
                digital products.
              </p>
              <p>
                I have a strong interest in creating responsive, user-friendly,
                and high-performance digital solutions that support business
                growth and enhance user experience.{" "}
                <span className="text-brandYellow font-bold">
                  &quot;Code meets creativity.&quot;
                </span>
              </p>
              <p>
                By leveraging modern web technologies and AI-powered tools, I
                continuously strive to deliver innovative, efficient, and
                business-focused solutions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4">
              <Link href="/about" className="block w-full md:w-auto">
                <button className="w-full md:w-auto bg-white hover:bg-gray-200 text-brandBlack cursor-pointer uppercase px-6 py-4 md:px-8 tracking-widest text-base md:text-xl font-bold transition-colors shadow-lg hover:shadow-xl">
                  READ FULL BIO
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
