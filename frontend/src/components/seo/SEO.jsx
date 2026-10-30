import React, { useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "article",
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterCard = "summary_large_image",
  schemaCode,
  customHeaderCode,
  noIndex = false,
}) => {
  // Normalize schema JSON-LD
  const cleanSchema = useMemo(() => {
    if (!schemaCode) return null;
    if (typeof schemaCode === "object") {
      try {
        return JSON.stringify(schemaCode, null, 2);
      } catch (e) {
        return null;
      }
    }
    let str = schemaCode.trim();
    // Strip opening <script...> and closing </script> if the user pasted wrapped script tags
    str = str.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "").trim();
    return str || null;
  }, [schemaCode]);

  // Direct DOM injection of Custom Header Code so any custom tags (meta, script, link, etc.)
  // appear immediately in <head> for DevTools Inspect
  useEffect(() => {
    if (!customHeaderCode || typeof customHeaderCode !== "string") return;

    const trimmed = customHeaderCode.trim();
    if (!trimmed) return;

    const container = document.createElement("div");
    container.innerHTML = trimmed;

    const insertedElements = [];
    Array.from(container.children).forEach((child) => {
      if (child.tagName === "SCRIPT") {
        // Re-create script element so the browser registers/executes it properly
        const s = document.createElement("script");
        Array.from(child.attributes).forEach((attr) => {
          s.setAttribute(attr.name, attr.value);
        });
        s.text = child.text || child.innerHTML;
        document.head.appendChild(s);
        insertedElements.push(s);
      } else {
        document.head.appendChild(child);
        insertedElements.push(child);
      }
    });

    return () => {
      insertedElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, [customHeaderCode]);

  const effectiveOgTitle = ogTitle || title;
  const effectiveOgDesc = ogDescription || description;
  const effectiveOgImage = ogImage;
  const effectiveTwitterTitle = twitterTitle || ogTitle || title;
  const effectiveTwitterDesc = twitterDescription || ogDescription || description;
  const effectiveTwitterImage = twitterImage || ogImage;

  return (
    <Helmet>
      {/* 1. Primary Title & Metadata */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* 2. Open Graph (Facebook, LinkedIn, WhatsApp, Slack) */}
      {effectiveOgTitle && <meta property="og:title" content={effectiveOgTitle} />}
      {effectiveOgDesc && <meta property="og:description" content={effectiveOgDesc} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {effectiveOgImage && <meta property="og:image" content={effectiveOgImage} />}

      {/* 3. Twitter / X Card */}
      <meta name="twitter:card" content={twitterCard} />
      {effectiveTwitterTitle && <meta name="twitter:title" content={effectiveTwitterTitle} />}
      {effectiveTwitterDesc && <meta name="twitter:description" content={effectiveTwitterDesc} />}
      {effectiveTwitterImage && <meta name="twitter:image" content={effectiveTwitterImage} />}

      {/* 4. Structured Data (JSON-LD Schema) */}
      {cleanSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: cleanSchema }}
        />
      )}
    </Helmet>
  );
};

export default SEO;
