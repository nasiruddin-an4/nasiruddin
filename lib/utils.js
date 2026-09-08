import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Sanitizes rich-text HTML (from the admin RichTextEditor) before it's
// rendered with dangerouslySetInnerHTML.
export function sanitizeHtml(html) {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "mark",
      "ul", "ol", "li", "blockquote", "a", "h3", "h4",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "style", "data-color"],
  });
}

// Strips tags to produce plain text, e.g. for meta descriptions.
export function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Estimates reading time from rich-text or plain content, e.g. "4 min read".
export function estimateReadTime(content) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// Converts a title into a URL-safe slug, e.g. for SEO-friendly detail pages.
export function slugify(title) {
  return (title || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
