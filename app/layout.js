import "./globals.css";

export const metadata = {
  title: "Nasir Uddin",
  description: "Software Engineer | Full-Stack Digital Marketer | Building Modern Web Applications",
};

import Sidebar from "./components/Sidebar";
import { fetchSettings } from "@/lib/api";
import Footer from "./components/Footer";

export default async function RootLayout({ children }) {
  const settings = await fetchSettings();
  const socialLinks = settings?.socials || [];

  return (
    <html lang="en" className="overflow-x-clip max-w-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`antialiased bg-brandBlack overflow-x-clip w-full max-w-full`}
      >
        <div className="flex min-h-screen">
          <Sidebar socialLinks={socialLinks} />
          <div className="flex-1 ml-0 md:ml-72 pt-[72px] md:pt-0 flex flex-col min-h-screen">
            {children}
            <div className="print:hidden mt-auto">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
