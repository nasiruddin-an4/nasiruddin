import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProjects } from "@/lib/api";
import { MoveLeft } from "lucide-react";
import { FaExternalLinkAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import Footer from "@/app/components/Footer";
import { sanitizeHtml, stripHtml } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const projectsData = await fetchProjects();
  const project = projectsData.find((item) => item.slug === id || item.id.toString() === id);
  if (!project) return { title: "Project Not Found" };
  const desc = stripHtml(project.aboutText) || project.description || `View ${project.title} by Nasir Uddin.`;
  const shortDesc = desc.substring(0, 160);
  const ogImage = project.coverImage || project.image;
  return {
    title: `${project.title} | Nasir Uddin`,
    description: shortDesc,
    keywords: project.tech,
    alternates: {
      canonical: `/projects/${project.slug || project.id}`,
    },
    openGraph: {
      title: `${project.title} | Nasir Uddin`,
      description: shortDesc,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Nasir Uddin`,
      description: shortDesc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProjectDetails({ params }) {
  const { id } = await params;
  const projectsData = await fetchProjects();
  const project = projectsData.find((item) => item.slug === id || item.id.toString() === id);

  if (!project) {
    notFound();
  }

  // Fallbacks for missing data based on design
  const companyName = project.company || project.title;
  const timeline = project.timeline || "N/A";

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: stripHtml(project.aboutText) || project.description,
    image: project.coverImage || project.image,
    creator: {
      "@type": "Person",
      name: "Nasir Uddin",
      url: "https://www.nasiruddin.net",
    },
    keywords: (project.tech || []).join(", "),
    ...(project.liveUrl && project.liveUrl !== "#" ? { url: project.liveUrl } : {}),
  };

  return (
    <div className="min-h-screen bg-brandBlack text-white pb-20 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32">

        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-brandYellow transition-colors duration-300 text-xs font-bold uppercase tracking-widest mb-8 group"
        >
          <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO PROJECTS
        </Link>

        {/* Project Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-16">{project.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">

          {/* Left Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-10 bg-zinc-900/40 p-6 md:p-8 rounded-2xl border border-zinc-800">

              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Company</h4>
                <p className="text-lg font-medium">{companyName}</p>
              </div>

              {project.myRole && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">My Role</h4>
                  <p className="text-lg font-medium">{project.myRole}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Category</h4>
                <p className="text-lg font-medium">{project.category}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Timelines</h4>
                <p className="text-lg font-medium">{timeline}</p>
              </div>

              {project.tech && project.tech.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Service We Provided</h4>
                  <div className="flex flex-col gap-3">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="text-sm bg-white text-black font-semibold px-4 py-3 rounded-full text-center hover:bg-brandYellow hover:text-white transition-colors cursor-default shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-zinc-800">
                <h4 className="text-sm font-medium text-zinc-400 mb-4">Share this Case Study:</h4>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brandYellow hover:text-brandBlack transition-colors">
                    <FaFacebookF size={16} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brandYellow hover:text-brandBlack transition-colors">
                    <FaTwitter size={16} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brandYellow hover:text-brandBlack transition-colors">
                    <FaLinkedinIn size={16} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brandYellow hover:text-brandBlack transition-colors">
                    <FaWhatsapp size={16} />
                  </a>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 space-y-16 lg:space-y-24">

            {/* Hero Image inside content column */}
            {(project.coverImage || project.image) && (
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={project.coverImage || project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Results / Impact */}
            {project.impact && project.impact.length > 0 && (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.impact.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-brandYellow/5 border border-brandYellow/20 rounded-2xl p-6 text-center"
                    >
                      <p className="text-brandYellow font-bold text-lg md:text-xl leading-snug">{stat}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* About the Project */}
            <section className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Project</h2>
              {project.aboutText ? (
                <div
                  className="richtext text-zinc-300 font-sans font-light text-lg"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.aboutText) }}
                />
              ) : (
                <p className="text-zinc-300 leading-relaxed font-sans font-light text-lg">
                  {project.description || ""}
                </p>
              )}
            </section>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section className="max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-zinc-300 text-base font-light"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brandYellow shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Middle Break Image */}
            {project.middleImage && (
              <section>
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <Image src={project.middleImage} alt={`${project.title} — feature screenshot`} fill className="object-cover" />
                </div>
              </section>
            )}

            {/* Problem & Solution */}
            {(project.problemStatement || project.solutionText) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {project.problemStatement && (
                  <div className="bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800/50">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm">01</span>
                      The Problem
                    </h3>
                    <div
                      className="richtext text-zinc-400 font-light text-lg"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.problemStatement) }}
                    />
                  </div>
                )}
                {project.solutionText && (
                  <div className="bg-brandYellow/5 p-8 rounded-3xl border border-brandYellow/10">
                    <h3 className="text-2xl font-bold text-brandYellow mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-brandYellow/20 text-brandYellow flex items-center justify-center text-sm">02</span>
                      The Solution
                    </h3>
                    <div
                      className="richtext text-zinc-300 font-light text-lg"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.solutionText) }}
                    />
                  </div>
                )}
              </section>
            )}

            {/* Testimonial */}
            {project.testimonialQuote && (
              <section className="max-w-4xl">
                <blockquote className="relative bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 md:p-12">
                  <span className="absolute top-4 left-6 font-oswald text-6xl md:text-7xl leading-none text-brandYellow/30 select-none" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="relative text-xl md:text-2xl font-serif italic text-zinc-200 leading-relaxed">
                    {project.testimonialQuote}
                  </p>
                  {project.testimonialAuthor && (
                    <footer className="mt-6 text-brandYellow font-semibold text-sm uppercase tracking-widest">
                      — {project.testimonialAuthor}
                    </footer>
                  )}
                </blockquote>
              </section>
            )}

            {/* Showcase Images Gallery */}
            {project.showcaseImages && project.showcaseImages.length > 0 && (
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.showcaseImages.map((img, idx) => (
                    <div key={idx} className={`relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl ${idx === 2 && project.showcaseImages.length % 2 !== 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}>
                      <Image src={img} alt={`${project.title} — showcase image ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>

        {/* Form CTA Section */}
        <section className="mt-24 lg:mt-32 pt-16 border-t border-zinc-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* CTA Left: Text and Profile */}
            <div className="">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Have a project idea in mind? <br /><span className="text-brandYellow">Let&apos;s get started</span>
              </h2>
              <p className="text-lg text-zinc-400 mb-12 max-w-md leading-relaxed">
                We&apos;ll schedule a call to discuss your idea. After discovery sessions, we&apos;ll send a proposal, and upon approval, we&apos;ll get started.
              </p>

              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border border-zinc-700 shadow-lg bg-zinc-800">
                  <Image src="/about_img.png" alt="Nasir Uddin" fill className="object-cover object-top" />
                </div>
                <div>
                  <h4 className="font-bold text-xl md:text-2xl lg:text-3xl text-white">Nasir Uddin</h4>
                  <p className="text-zinc-400 text-sm md:text-base mt-1">Software Engineer &<br />Digital Marketer</p>
                </div>
              </div>
            </div>

            {/* CTA Right: The Form */}
            <div className="bg-white text-black p-8 md:p-12 rounded-3xl shadow-2xl">
              <form className="space-y-8">

                <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input type="text" placeholder="Jane Cooper" className="w-full bg-transparent border-b border-zinc-300 py-2 focus:outline-none focus:border-brandYellow transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-2">Company name</label>
                    <input type="text" placeholder="Ex. Tesla Inc" className="w-full bg-transparent border-b border-zinc-300 py-2 focus:outline-none focus:border-brandYellow transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contact Number*</label>
                    <input type="number" placeholder="01711111111" className="w-full bg-transparent border-b border-zinc-300 py-2 focus:outline-none focus:border-brandYellow transition-colors" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-2">Service required*</label>
                    <select defaultValue="" className="w-full bg-transparent border-b border-zinc-300 py-2 focus:outline-none focus:border-brandYellow transition-colors appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Your Service</option>
                      <option>Web Development</option>
                      <option>UI/UX Design</option>
                      <option>Digital Marketing</option>
                      <option>Software Development</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email*</label>
                    <input type="email" placeholder="You@Example.Com" className="w-full bg-transparent border-b border-zinc-300 py-2 focus:outline-none focus:border-brandYellow transition-colors" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Project details*</label>
                  <textarea placeholder="Tell us more about your idea" rows="3" className="w-full bg-transparent border-b border-zinc-300 py-2 focus:outline-none focus:border-brandYellow transition-colors resize-none" required></textarea>
                </div>

                <button type="submit" className="w-full bg-[#111] text-white font-bold py-4 rounded-xl hover:bg-brandYellow hover:text-black transition-all shadow-md">
                  Send inquiry
                </button>

              </form>

              <div className="mt-3 text-center text-sm font-semibold">
                Not interested to submit the form? <Link href="/contact" className="text-green-600 hover:text-green-500 underline underline-offset-4">Book A Call Directly</Link>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
