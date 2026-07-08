import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="w-full bg-brandBlack text-white flex flex-col py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-20">
          {/* Image Column */}
          <div className="w-full md:w-1/2 relative order-2 md:order-1 mt-8 md:mt-0">
            <div className="relative w-full aspect-square md:aspect-[4/5]">
              <Image
                src="/aboutImg.png"
                alt="Nasir Uddin"
                fill
                unoptimized
                priority
                className="object-cover transition-all duration-700"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center order-1 md:order-2">
            <div className="mb-4 md:mb-6 inline-block">
              <AnimatedHeading
                className="text-2xl md:text-3xl lg:text-4xl"
                initialColor="text-brandBlack"
                finalColor="text-brandBlack"
              >
                ABOUT ME
              </AnimatedHeading>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8">
              I Build Impactful Digital Experiences
            </h3>

            <div className="space-y-4 md:space-y-6 text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide font-serif md:font-sans">
              <p>
                I am a Software Engineer and Full-Stack Digital Marketer with
                experience in developing modern web applications, corporate
                websites, enterprise dashboards, and digital products.
              </p>
              <p>
                I have a strong interest in creating responsive, user-friendly,
                and high-performance digital solutions that support business
                growth and enhance user experience.{" "}
                <span className="text-[#fceb3b] font-bold">
                  &quot;Code meets creativity.&quot;
                </span>
              </p>
              <p>
                By leveraging modern web technologies and AI-powered tools, I
                continuously strive to deliver innovative, efficient, and
                business-focused solutions.
              </p>
            </div>

            <div className="mt-8 md:mt-10">
              <Link href="/about" className="block w-full md:w-auto">
                <button className="w-full md:w-auto bg-white hover:bg-gray-200 text-brandBlack cursor-pointer uppercase px-6 py-4 md:px-8 tracking-widest text-base md:text-xl font-bold transition-colors">
                  READ FULL BIO
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
