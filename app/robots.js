export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/search"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "Claude-Web", "anthropic-ai", "PerplexityBot", "CCBot"],
        allow: "/",
      }
    ],
    sitemap: "https://www.nasiruddin.net/sitemap.xml",
  };
}
