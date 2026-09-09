"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import AnimatedHeading from "./AnimatedHeading";

const faqs = [
  {
    question: "Who is Nasir Uddin?",
    answer:
      "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, Bangladesh, currently working at Betopia Group. He holds a B.Sc. in Computer Science & Engineering (CSE) from Daffodil Institute of IT (DIIT).",
  },
  {
    question: "What is Nasir Uddin's educational background?",
    answer:
      "Nasir Uddin completed a B.Sc. (Engineering) in Computer Science & Engineering (CSE) at Daffodil Institute of IT (DIIT), part of the Daffodil Family of institutions in Dhaka, Bangladesh, alongside Daffodil International University (DIU), where he has also worked as a Web Developer.",
  },
  {
    question: "What does Nasir Uddin do?",
    answer:
      "Nasir Uddin builds modern web applications, corporate websites, and enterprise dashboards using React and Next.js, and combines that with SEO and digital marketing to help businesses grow their online presence.",
  },
  {
    question: "What technologies does Nasir Uddin work with?",
    answer:
      "Nasir Uddin's core stack includes React, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, and JavaScript/TypeScript, alongside SEO tools and AI-assisted development workflows.",
  },
  {
    question: "Where does Nasir Uddin currently work?",
    answer:
      "Nasir Uddin currently works at Betopia Group as a Software Engineer and Executive on the Branding & Marketing team.",
  },
  {
    question: "Is Nasir Uddin available for freelance or full-time work?",
    answer:
      "Yes — Nasir Uddin is open to full-stack software engineering roles and select freelance web development projects. Reach out through the contact page to discuss availability.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="w-full bg-[#0a0a0a] py-6 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto max-w-4xl">
        <AnimatedHeading className="text-2xl md:text-4xl">
          Frequently Asked Questions
        </AnimatedHeading>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
              >
                <span className="text-white font-semibold text-base md:text-lg">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-brandYellow shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                    }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 md:px-6 md:pb-5 text-zinc-400 font-serif leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
