import Link from "next/link";
import { MoveLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Nasir Uddin",
  description: "How Nasir Uddin's website collects, uses, and protects your information.",
  alternates: {
    canonical: "/privacy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brandBlack text-white pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-brandYellow transition-colors duration-300 text-xs font-bold uppercase tracking-widest mb-8 group"
        >
          <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO HOME
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: September 8, 2026</p>

        <div className="space-y-10 text-zinc-300 font-sans leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Overview</h2>
            <p>
              This Privacy Policy explains what information nasiruddin.net (&quot;this
              site&quot;) collects, why, and how it is used. This site is operated by
              Nasir Uddin as a personal portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Information You Provide</h2>
            <p>
              If you use the Contact form, the project inquiry form, or the newsletter
              sign-up, you voluntarily provide details such as your name, email address,
              phone number, and message content. This information is used only to respond
              to your inquiry or to send newsletter updates you&apos;ve opted into, and is
              never sold to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Automatically Collected Information</h2>
            <p>
              This site uses Google Tag Manager to load analytics tooling, which may set
              cookies and collect standard usage data such as pages visited, browser type,
              and approximate location, in order to understand how the site is used and
              improve it over time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Third-Party Services</h2>
            <p>
              Images and media on this site may be served via Cloudinary. Analytics data
              is processed via Google Tag Manager / Google Analytics. These providers may
              process data according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Your Choices</h2>
            <p>
              You can decline to submit personal information via the site&apos;s forms at
              any time. To request removal of previously submitted data, contact{" "}
              <a href="mailto:nasiruddin.an4@gmail.com" className="text-brandYellow hover:underline">
                nasiruddin.an4@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Changes to This Policy</h2>
            <p>
              This policy may be updated from time to time. Continued use of the site
              after changes constitutes acceptance of the revised policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
