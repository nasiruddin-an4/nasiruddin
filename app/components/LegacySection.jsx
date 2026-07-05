import Link from "next/link";
import AnimatedHeading from "./AnimatedHeading";
import legacyData from "../../data/legacy.json";

export default function LegacySection() {
  return (
    <section className="w-full bg-brandBlack text-white flex flex-col pt-24 md:pt-32">
      <div className="flex flex-col items-center px-4 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl uppercase max-w-6xl mx-auto mb-6">
          &quot;CODE MEETS CREATIVITY.&quot;
        </h2>
        <AnimatedHeading
          className="text-2xl md:text-3xl tracking-wide"
          initialColor="text-brandBlack"
          finalColor="text-brandBlack"
        >
          NASIR UDDIN
        </AnimatedHeading>
      </div>

      {/* Cards Area */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        {legacyData.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="relative block w-full h-[350px] md:h-[450px] lg:h-[500px] bg-zinc-900 border-r border-brandBlack last:border-r-0 overflow-hidden group cursor-pointer"
          >
            <div
              className={`absolute inset-0 bg-center ${item.isLogo ? "bg-brandBlack" : "bg-cover"}`}
              style={{
                backgroundImage: `url('${item.image}')`,
                backgroundSize: item.isLogo ? "50%" : "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="absolute inset-0 bg-brandBlack/40 group-hover:bg-[#fceb3b]/50 transition-colors duration-500" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-12 p-6 h-full text-center group-hover:text-brandBlack transition-colors duration-500">
              <h3 className="text-2xl md:text-3xl uppercase mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                {item.title}
              </h3>
              <p className="text-sm md:text-base font-serif italic text-gray-300 group-hover:text-brandBlack opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                {item.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
