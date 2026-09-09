import { describe, it, expect } from "vitest";
import {
  cn,
  sanitizeHtml,
  stripHtml,
  estimateReadTime,
  sortExperiencesByRecency,
  sortProjectsForDisplay,
  slugify,
  escapeHtml,
  isValidVisitPayload,
  clampVisitField,
} from "./utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-white", false && "hidden", "font-bold")).toBe("text-white font-bold");
  });
});

describe("sanitizeHtml", () => {
  it("returns an empty string for falsy input", () => {
    expect(sanitizeHtml("")).toBe("");
    expect(sanitizeHtml(null)).toBe("");
    expect(sanitizeHtml(undefined)).toBe("");
  });

  it("keeps allowed rich-text tags", () => {
    const input = "<p>Hello <strong>world</strong></p>";
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("strips disallowed tags but keeps their text content", () => {
    expect(sanitizeHtml("<script>alert(1)</script><p>safe</p>")).toBe("<p>safe</p>");
    expect(sanitizeHtml("<img src=x onerror=alert(1)>")).toBe("");
  });

  it("strips event handler and non-http(s)/mailto link attributes", () => {
    const result = sanitizeHtml('<a href="javascript:alert(1)" onclick="evil()">click</a>');
    expect(result).not.toContain("javascript:");
    expect(result).not.toContain("onclick");
  });

  it("allows safe href schemes on links", () => {
    const result = sanitizeHtml('<a href="https://example.com">link</a>');
    expect(result).toContain('href="https://example.com"');
  });

  it("allows only the whitelisted inline styles used by the highlight feature", () => {
    const kept = sanitizeHtml('<mark style="background-color:#fceb3b">hi</mark>');
    expect(kept).toContain("background-color");

    const stripped = sanitizeHtml('<mark style="position:fixed;top:0;left:0">hi</mark>');
    expect(stripped).not.toContain("position");
  });
});

describe("stripHtml", () => {
  it("removes tags and collapses whitespace", () => {
    expect(stripHtml("<p>Hello   <strong>world</strong></p>")).toBe("Hello world");
  });

  it("returns an empty string for falsy input", () => {
    expect(stripHtml("")).toBe("");
    expect(stripHtml(null)).toBe("");
  });
});

describe("estimateReadTime", () => {
  it("rounds up to at least 1 minute for short content", () => {
    expect(estimateReadTime("just a few words here")).toBe("1 min read");
  });

  it("estimates based on a 200 words-per-minute rate", () => {
    const words = new Array(400).fill("word").join(" ");
    expect(estimateReadTime(words)).toBe("2 min read");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("DIU Faculty Directory")).toBe("diu-faculty-directory");
  });

  it("strips non-alphanumeric characters and leading/trailing hyphens", () => {
    expect(slugify("  Hello, World! 2026  ")).toBe("hello-world-2026");
  });

  it("returns an empty string for falsy input", () => {
    expect(slugify("")).toBe("");
    expect(slugify(undefined)).toBe("");
  });
});

describe("escapeHtml", () => {
  it("escapes all five HTML-significant characters", () => {
    expect(escapeHtml(`<script>"it's" & <b>bold</b></script>`)).toBe(
      "&lt;script&gt;&quot;it&#39;s&quot; &amp; &lt;b&gt;bold&lt;/b&gt;&lt;/script&gt;"
    );
  });

  it("handles nullish input safely", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });
});

describe("isValidVisitPayload", () => {
  it("accepts a well-formed payload", () => {
    expect(isValidVisitPayload({ path: "/projects", sessionId: "abc123" })).toBe(true);
  });

  it("rejects a missing or non-relative path", () => {
    expect(isValidVisitPayload({ path: "javascript:alert(1)", sessionId: "abc" })).toBe(false);
    expect(isValidVisitPayload({ sessionId: "abc" })).toBe(false);
  });

  it("rejects a missing or empty sessionId", () => {
    expect(isValidVisitPayload({ path: "/" })).toBe(false);
    expect(isValidVisitPayload({ path: "/", sessionId: "   " })).toBe(false);
  });

  it("rejects an excessively long path or sessionId", () => {
    expect(isValidVisitPayload({ path: "/" + "a".repeat(600), sessionId: "abc" })).toBe(false);
    expect(isValidVisitPayload({ path: "/", sessionId: "a".repeat(200) })).toBe(false);
  });

  it("rejects a non-object payload", () => {
    expect(isValidVisitPayload(null)).toBe(false);
    expect(isValidVisitPayload(undefined)).toBe(false);
  });
});

describe("clampVisitField", () => {
  it("truncates strings longer than the max length", () => {
    expect(clampVisitField("a".repeat(600)).length).toBe(500);
  });

  it("returns an empty string for non-string input", () => {
    expect(clampVisitField(undefined)).toBe("");
    expect(clampVisitField(42)).toBe("");
  });
});

describe("sortExperiencesByRecency", () => {
  it("puts ongoing ('Present') roles first", () => {
    const input = [
      { title: "Old Job", duration: "Jan 2020 - Dec 2021" },
      { title: "Current Job", duration: "Jan 2024 - Present" },
    ];
    expect(sortExperiencesByRecency(input).map((e) => e.title)).toEqual(["Current Job", "Old Job"]);
  });

  it("orders finished roles by end date, most recent first", () => {
    const input = [
      { title: "Earlier", duration: "Jan 2020 - Dec 2020" },
      { title: "Later", duration: "Jan 2022 - Dec 2022" },
    ];
    expect(sortExperiencesByRecency(input).map((e) => e.title)).toEqual(["Later", "Earlier"]);
  });

  it("does not mutate the original array", () => {
    const input = [{ title: "A", duration: "Jan 2020 - Dec 2020" }, { title: "B", duration: "Jan 2022 - Present" }];
    const copy = [...input];
    sortExperiencesByRecency(input);
    expect(input).toEqual(copy);
  });
});

describe("sortProjectsForDisplay", () => {
  it("puts featured projects before non-featured ones regardless of order/date", () => {
    const input = [
      { title: "Regular", featured: false, order: 0, createdAt: "2026-06-01" },
      { title: "Pinned", featured: true, order: 99, createdAt: "2020-01-01" },
    ];
    expect(sortProjectsForDisplay(input).map((p) => p.title)).toEqual(["Pinned", "Regular"]);
  });

  it("orders same-featured-status projects by ascending 'order'", () => {
    const input = [
      { title: "Third", featured: true, order: 3, createdAt: "2026-01-01" },
      { title: "First", featured: true, order: 1, createdAt: "2026-01-01" },
      { title: "Second", featured: true, order: 2, createdAt: "2026-01-01" },
    ];
    expect(sortProjectsForDisplay(input).map((p) => p.title)).toEqual(["First", "Second", "Third"]);
  });

  it("falls back to newest-created when order is tied", () => {
    const input = [
      { title: "Older", featured: false, order: 0, createdAt: "2025-01-01" },
      { title: "Newer", featured: false, order: 0, createdAt: "2026-01-01" },
    ];
    expect(sortProjectsForDisplay(input).map((p) => p.title)).toEqual(["Newer", "Older"]);
  });

  it("does not mutate the original array", () => {
    const input = [
      { title: "A", featured: false, order: 2, createdAt: "2026-01-01" },
      { title: "B", featured: false, order: 1, createdAt: "2026-01-01" },
    ];
    const copy = [...input];
    sortProjectsForDisplay(input);
    expect(input).toEqual(copy);
  });
});
