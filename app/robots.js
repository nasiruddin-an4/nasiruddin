export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "Claude-Web", "anthropic-ai", "PerplexityBot", "CCBot"],
        allow: "/",
      }
    ],
    sitemap: "https://nasiruddin.net/sitemap.xml",
  };
}
