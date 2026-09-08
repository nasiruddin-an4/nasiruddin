import Link from "next/link";
import { MoveLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Nasir Uddin",
  description: "Terms governing your use of Nasir Uddin's website.",
  alternates: {
    canonical: "/terms",
  },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
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

        <h1 className="text-3xl md:text-5xl font-bold mb-4">Terms of Use</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: September 8, 2026</p>

        <div className="space-y-10 text-zinc-300 font-sans leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Acceptance of Terms</h2>
            <p>
              By accessing nasiruddin.net, you agree to these Terms of Use. If you do not
              agree, please discontinue use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Content Ownership</h2>
            <p>
              All content on this site — including text, project write-ups, images, and
              design — is the property of Nasir Uddin unless otherwise credited, and may
              not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Use of the Site</h2>
            <p>
              You agree to use this site only for lawful purposes and not to attempt to
              disrupt, misuse, or gain unauthorized access to any part of it, including
              the admin dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">External Links</h2>
            <p>
              This site links to external sites (project demos, social profiles, press
              coverage). Nasir Uddin is not responsible for the content or practices of
              those third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">No Warranty</h2>
            <p>
              This site and its content are provided &quot;as is&quot; without warranties
              of any kind, express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:nasiruddin.an4@gmail.com" className="text-brandYellow hover:underline">
                nasiruddin.an4@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
