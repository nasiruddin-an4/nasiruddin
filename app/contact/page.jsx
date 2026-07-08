"use client";

import { useState } from "react";
import AnimatedHeading from "@/app/components/AnimatedHeading";
import { MoveRight } from "lucide-react";
import Footer from "@/app/components/Footer";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    otherSubject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    alert("Thanks for reaching out! We will get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      otherSubject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-brandBlack text-white pt-10 md:pt-16 pb-24 overflow-hidden">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Contact Information Sidebar */}
          <div className="flex flex-col lg:col-span-4">
            <div className="mb-10">
              <AnimatedHeading className="text-4xl">CONTACT</AnimatedHeading>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-serif mt-4">
                A few different options for getting in touch with me or the
                team.
              </p>
            </div>
            <div>
              <h3 className="text-3xl text-brandYellow">NEWS & MEDIA</h3>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-serif mb-12">
                For all interviews, media opportunities, and anything else
                press-related
              </p>
            </div>

            <div>
              <h3 className="text-3xl text-brandYellow mb-6">CONNECT</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-brandYellow hover:text-brandBlack transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brandYellow/20 transition-colors duration-700"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-zinc-400 block mb-2 font-serif">
                    Full Name *
                  </label>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-brandBlack/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brandYellow focus:ring-1 focus:ring-brandYellow transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-2 font-serif">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-brandBlack/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brandYellow focus:ring-1 focus:ring-brandYellow transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 font-serif">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-brandBlack/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brandYellow focus:ring-1 focus:ring-brandYellow transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 block mb-2 font-serif">
                    SUBJECT *
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-brandBlack/50 border border-zinc-800 rounded-xl font-serif px-4 py-3 text-white focus:outline-none focus:border-brandYellow focus:ring-1 focus:ring-brandYellow transition-all duration-300 appearance-none"
                    >
                      <option value="" disabled>
                        Select a subject...
                      </option>
                      {[
                        "General Contact",
                        "Job Opportunity",
                        "Freelance Project",
                        "Collaboration",
                        "Press / Media Inquiry",
                        "Other",
                      ].map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-brandBlack text-white font-serif"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  {/* Extra field when 'Other' is selected */}
                  {formData.subject === "Other" && (
                    <div className="">
                      <input
                        type="text"
                        name="otherSubject"
                        value={formData.otherSubject}
                        onChange={handleChange}
                        placeholder="Please specify"
                        className="w-full bg-brandBlack/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brandYellow focus:ring-1 focus:ring-brandYellow transition-all duration-300"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm text-zinc-400 font-serif">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-brandBlack/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brandYellow focus:ring-1 focus:ring-brandYellow transition-all duration-300 resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-4 bg-white text-brandBlack rounded-full font-bold flex font-serif items-center justify-center gap-3 hover:bg-brandYellow hover:gap-5 transition-all duration-300 group cursor-pointer uppercase tracking-wider text-sm"
                >
                  Submit
                  <MoveRight className="w-5 h-5 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
