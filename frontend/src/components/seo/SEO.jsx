import React, { useMemo } from "react";
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
  // Normalize schema JSON
  const schemaString = useMemo(() => {
    if (!schemaCode) return null;
    if (typeof schemaCode === "object") {
      try {
        return JSON.stringify(schemaCode);
      } catch (e) {
        return null;
      }
    }
    const trimmed = schemaCode.trim();
    if (trimmed.startsWith("<script") && trimmed.endsWith("</script>")) {
      return trimmed.replace(/<script[^>]*>/, "").replace(/<\/script>/, "");
    }
    try {
      JSON.parse(trimmed); // Validate it's valid JSON
      return trimmed;
    } catch (e) {
      return null;
    }
  }, [schemaCode]);

  // Safely parse allowed meta and link tags from customHeaderCode
  const customTags = useMemo(() => {
    if (!customHeaderCode || typeof customHeaderCode !== "string") return [];

    const tags = [];
    // Match <meta ... /> and <link ... />
    const metaRegex = /<meta\s+([^>]+)>/gi;
    const linkRegex = /<link\s+([^>]+)>/gi;

    let match;
    while ((match = metaRegex.exec(customHeaderCode)) !== null) {
      const attrString = match[1];
      const attrs = {};
      const attrRegex = /([a-zA-Z0-9_-]+)=["']([^"']*)["']/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrString)) !== null) {
        attrs[attrMatch[1].toLowerCase()] = attrMatch[2];
      }
      if (attrs.name || attrs.property || attrs["http-equiv"]) {
        tags.push({ type: "meta", props: attrs, key: `custom-meta-${tags.length}` });
      }
    }

    while ((match = linkRegex.exec(customHeaderCode)) !== null) {
      const attrString = match[1];
      const attrs = {};
      const attrRegex = /([a-zA-Z0-9_-]+)=["']([^"']*)["']/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrString)) !== null) {
        attrs[attrMatch[1].toLowerCase()] = attrMatch[2];
      }
      if (attrs.rel && attrs.href) {
        tags.push({ type: "link", props: attrs, key: `custom-link-${tags.length}` });
      }
    }

    return tags;
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

      {/* 2. Open Graph (Facebook, LinkedIn, Slack) */}
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
      {schemaString && (
        <script type="application/ld+json">
          {schemaString}
        </script>
      )}

      {/* 5. Safe Custom Head Elements (<meta>, <link>) */}
      {customTags.map((tag) => {
        if (tag.type === "meta") {
          return <meta key={tag.key} {...tag.props} />;
        }
        if (tag.type === "link") {
          return <link key={tag.key} {...tag.props} />;
        }
        return null;
      })}
    </Helmet>
  );
};

export default SEO;
