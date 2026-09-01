"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackedPaths = useRef(new Set()); // Prevents duplicate tracking on strict mode

  useEffect(() => {
    // Generate or retrieve a session ID for the user
    let sessionId = sessionStorage.getItem("agy_session_id");
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem("agy_session_id", sessionId);
    }

    // Combine path and search params for full URL path tracking if needed, 
    // but the task mainly asked for path and UTM.
    const fullPath = pathname; 
    
    // Check if this path was already tracked in this session to prevent double firing in React strict mode
    if (trackedPaths.current.has(fullPath)) return;
    trackedPaths.current.add(fullPath);

    const utmSource = searchParams.get("utm_source") || "";
    const utmMedium = searchParams.get("utm_medium") || "";
    const utmCampaign = searchParams.get("utm_campaign") || "";
    const utmTerm = searchParams.get("utm_term") || "";
    const utmContent = searchParams.get("utm_content") || "";
    
    const referrer = document.referrer || "";
    const userAgent = navigator.userAgent || "";

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: fullPath,
        referrer,
        userAgent,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        sessionId,
      }),
    }).catch((err) => console.error("Analytics tracking failed:", err));

  }, [pathname, searchParams]);

  return null; // This is a silent component
}
