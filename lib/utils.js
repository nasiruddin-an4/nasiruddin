import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitize from "sanitize-html";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Sanitizes rich-text HTML (from the admin RichTextEditor) before it's
// rendered with dangerouslySetInnerHTML. Uses sanitize-html (pure JS) rather
// than a jsdom-based sanitizer, since jsdom's dependency chain breaks when
// bundled into Vercel serverless functions.
export function sanitizeHtml(html) {
  if (!html) return "";
  return sanitize(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "mark",
      "ul", "ol", "li", "blockquote", "a", "h3", "h4",
    ],
    allowedAttributes: {
      "*": ["style", "data-color"],
      a: ["href", "target", "rel"],
    },
    allowedStyles: {
      "*": {
        "background-color": [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(.*\)$/],
        color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(.*\)$/, /^inherit$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto"],
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

// Sorts experiences most-recent-first by parsing their "duration" string
// (e.g. "Jan 2024 - Present"). "Present"/"Current" sorts as ongoing.
export function sortExperiencesByRecency(experiences) {
  const parseEndDate = (duration) => {
    if (!duration) return 0;
    const parts = duration.split(/[-–]/).map((s) => s.trim());
    const endStr = parts.length > 1 ? parts[1] : parts[0];
    if (endStr.toLowerCase() === "present" || endStr.toLowerCase() === "current") return Infinity;
    const date = new Date(endStr);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  const parseStartDate = (duration) => {
    if (!duration) return 0;
    const parts = duration.split(/[-–]/).map((s) => s.trim());
    const date = new Date(parts[0]);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  return [...experiences].sort((a, b) => {
    const aEnd = parseEndDate(a.duration);
    const bEnd = parseEndDate(b.duration);
    if (aEnd !== bEnd) return bEnd - aEnd;
    return parseStartDate(b.duration) - parseStartDate(a.duration);
  });
}

// Orders projects for display: pinned/featured projects first, then by the
// admin-assigned serial "order" (ascending), then newest-created as a
// tiebreaker for projects that haven't been given an explicit order yet.
export function sortProjectsForDisplay(projects) {
  return [...projects].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    const orderDiff = (a.order || 0) - (b.order || 0);
    if (orderDiff !== 0) return orderDiff;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

// Converts a title into a URL-safe slug, e.g. for SEO-friendly detail pages.
export function slugify(title) {
  return (title || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Escapes user-supplied text before interpolating it into raw HTML strings
// (e.g. transactional emails), since that HTML isn't run through sanitizeHtml.
export function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const MAX_VISIT_FIELD_LENGTH = 500;

// Validates an incoming /api/track payload before it's written to the
// database: path must be a real app-relative path, sessionId must exist.
export function isValidVisitPayload(data) {
  return Boolean(
    data &&
    typeof data.path === "string" &&
    data.path.startsWith("/") &&
    data.path.length <= MAX_VISIT_FIELD_LENGTH &&
    typeof data.sessionId === "string" &&
    data.sessionId.trim().length > 0 &&
    data.sessionId.length <= 100
  );
}

// Truncates a visit-tracking field to a safe max length before storage.
export function clampVisitField(value) {
  if (typeof value !== "string") return "";
  return value.slice(0, MAX_VISIT_FIELD_LENGTH);
}
