import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://nasiruddin.net"),
  title: {
    default: "Nasir Uddin | Software Engineer & Full-Stack Digital Marketer",
    template: "%s | Nasir Uddin",
  },
  description: "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, specializing in building modern, scalable web applications and SEO optimization.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Digital Marketing Expert", "Next.js Developer", "React Developer", "SEO Expert", "Web Development", "Dhaka, Bangladesh", "Nasir Uddin"],
  authors: [{ name: "Nasir Uddin", url: "https://nasiruddin.net" }],
  creator: "Nasir Uddin",
  publisher: "Nasir Uddin",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasiruddin.net",
    title: "Nasir Uddin | Software Engineer & Full-Stack Digital Marketer",
    description: "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, specializing in building modern, scalable web applications.",
    siteName: "Nasir Uddin Portfolio",
    images: [
      {
        url: "/ogimg.png",
        width: 1200,
        height: 630,
        alt: "Nasir Uddin - Software Engineer & Full-Stack Digital Marketer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasir Uddin | Software Engineer & Full-Stack Digital Marketer",
    description: "Software Engineer and Full-Stack Digital Marketer based in Dhaka.",
    images: ["/ogimg.png"],
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

import { fetchSettings } from "@/lib/api";
import LayoutWrapper from "./components/LayoutWrapper";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { Suspense } from "react";

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
              "image": "https://nasiruddin.net/ogimg.png",
              "jobTitle": "Software Engineer & Full-Stack Digital Marketer",
              "worksFor": {
                "@type": "Organization",
                "name": "Betopia Group"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Daffodil Institute of IT (DIIT)"
              },
              "homeLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Dhaka",
                  "addressCountry": "BD"
                }
              },
              "sameAs": socialLinks.map(link => link.url),
              "description": "Nasir Uddin is a Software Engineer and Full-Stack Digital Marketer based in Dhaka, specializing in building modern, scalable web applications.",
              "knowsAbout": [
                "Web Development", "React", "Next.js", "Node.js", "MongoDB",
                "JavaScript", "TypeScript", "SEO", "Digital Marketing",
                "Full-Stack Development", "Tailwind CSS"
              ]
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
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <LayoutWrapper sidebar={<Sidebar socialLinks={socialLinks} />} footer={<Footer />}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
