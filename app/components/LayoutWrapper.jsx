"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children, sidebar, footer }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {sidebar}
      <div className="flex-1 ml-0 md:ml-72 pt-[72px] md:pt-0 flex flex-col min-h-screen">
        {children}
        <div className="print:hidden mt-auto">
          {footer}
        </div>
      </div>
    </div>
  );
}

