import "./globals.css";

export const metadata = {
  title: "Nasir Uddin",
  description: "Software Engineer | Full-Stack Digital Marketer | Building Modern Web Applications",
};

import Sidebar from "./components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-clip max-w-full">
      <body
        className={`antialiased bg-brandBlack overflow-x-clip w-full max-w-full`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-0 md:ml-72 pt-[72px] md:pt-0 flex flex-col min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
