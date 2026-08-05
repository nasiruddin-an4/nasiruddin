import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://nasiruddin.net"),
  title: {
    default: "Nasir Uddin | Software Engineer & Digital Marketer",
    template: "%s | Nasir Uddin",
  },
  description: "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, specializing in building modern, scalable web applications and SEO optimization.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Digital Marketing Expert", "Next.js Developer", "React Developer", "SEO Expert", "Web Development", "Dhaka, Bangladesh", "Nasir Uddin"],
  authors: [{ name: "Nasir Uddin", url: "https://nasiruddin.net" }],
  creator: "Nasir Uddin",
  publisher: "Nasir Uddin",
  icons: {
    icon: '/nasirLogo.png',
    apple: '/nasirLogo.png',
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasiruddin.net",
    title: "Nasir Uddin | Software Engineer & Digital Marketer",
    description: "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, specializing in building modern, scalable web applications.",
    siteName: "Nasir Uddin Portfolio",
    images: [
      {
        url: "/OGImg.png",
        width: 1200,
        height: 630,
        alt: "Nasir Uddin - Software Engineer & Digital Marketer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasir Uddin | Software Engineer",
    description: "Software Engineer and Full-Stack Digital Marketer based in Dhaka.",
    images: ["/OGImg.png"],
    creator: "@nasiruddin", 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Sidebar from "./components/Sidebar";
import { fetchSettings } from "@/lib/api";
import Footer from "./components/Footer";

export default async function RootLayout({ children }) {
  const settings = await fetchSettings();
  const socialLinks = settings?.socials || [];

  return (
    <html lang="en" className="overflow-x-clip max-w-full" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nasir Uddin",
              "url": "https://nasiruddin.net",
              "image": "https://nasiruddin.net/OGImg.png",
              "jobTitle": "Software Engineer & Digital Marketer",
              "worksFor": {
                "@type": "Organization",
                "name": "Self-Employed"
              },
              "sameAs": socialLinks.map(link => link.url),
              "description": "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, specializing in building modern, scalable web applications.",
              "knowsAbout": ["Web Development", "React", "Next.js", "SEO", "Digital Marketing", "Full-Stack Development"]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Nasir Uddin Portfolio",
              "url": "https://nasiruddin.net",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://nasiruddin.net/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`antialiased bg-brandBlack overflow-x-clip w-full max-w-full`}
      >
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M75CRFVV');`}
        </Script>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M75CRFVV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
