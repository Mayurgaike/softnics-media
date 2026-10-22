const sanitizeHtml = require("sanitize-html");

/**
 * Sanitize rich text HTML content from the WYSIWYG editor.
 * Strips script tags, unsafe event handlers, object/embed, and dangerous URL schemes.
 */
function sanitizeRichText(dirtyHtml) {
  if (!dirtyHtml || typeof dirtyHtml !== "string") return "";

  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "a", "ul", "ol", "li", "nl",
      "b", "i", "strong", "em", "strike", "s", "u", "code", "pre",
      "blockquote", "hr", "br", "div", "span",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
      "img", "figure", "figcaption", "iframe",
      "sub", "sup"
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel", "title", "class", "style"],
      img: ["src", "alt", "title", "width", "height", "loading", "class", "style"],
      iframe: ["src", "width", "height", "frameborder", "allowfullscreen", "class", "style"],
      table: ["class", "style", "border", "cellpadding", "cellspacing"],
      tr: ["class", "style"],
      th: ["class", "style", "colspan", "rowspan", "scope"],
      td: ["class", "style", "colspan", "rowspan"],
      "*": ["class", "style", "id"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"], // data: URI allowed for embedded images if small
      iframe: ["http", "https"]
    },
    allowedIframeHostnames: [
      "www.youtube.com",
      "youtube.com",
      "www.youtube-nocookie.com",
      "player.vimeo.com"
    ],
    transformTags: {
      a: (tagName, attribs) => {
        // Enforce safe external link behavior
        if (attribs.target === "_blank") {
          attribs.rel = "noopener noreferrer";
        }
        return { tagName, attribs };
      }
    }
  });
}

/**
 * Safely validate and sanitize custom header code.
 * Only permits <meta>, <link>, and <script type="application/ld+json">.
 * Rejects executable scripts, arbitrary JavaScript, and dangerous tags.
 */
function validateAndSanitizeHeaderCode(headerCode) {
  if (!headerCode || typeof headerCode !== "string") return "";

  return sanitizeHtml(headerCode, {
    allowVulnerableTags: true,
    allowedTags: ["meta", "link", "script"],
    allowedAttributes: {
      meta: ["name", "property", "content", "http-equiv", "charset"],
      link: ["rel", "href", "type", "sizes", "media", "crossorigin", "as"],
      script: ["type"]
    },
    allowedSchemes: ["http", "https"],
    exclusiveFilter: (frame) => {
      // If tag is script, it MUST strictly be application/ld+json
      if (frame.tag === "script") {
        const type = (frame.attribs.type || "").trim().toLowerCase();
        if (type !== "application/ld+json") {
          return true; // Filter out / drop this script tag
        }
      }
      return false;
    }
  });
}

/**
 * Validates and normalizes slug strings.
 */
function formatSlug(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_-]+/g, "-")  // collapse whitespace and underscore to hyphen
    .replace(/^-+|-+$/g, "");   // trim leading/trailing hyphens
}

/**
 * Validates whether a slug conforms to URL slug standard.
 */
function isValidSlug(slug) {
  if (!slug || typeof slug !== "string") return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

module.exports = {
  sanitizeRichText,
  validateAndSanitizeHeaderCode,
  formatSlug,
  isValidSlug
};
