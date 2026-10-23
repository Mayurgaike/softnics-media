<?php
/**
 * Softnics Media - Dynamic SEO Pre-Renderer for Hostinger
 * Injects dynamic CMS SEO metadata into <head> of index.html for View Source and Search Crawlers.
 */

$htmlFile = __DIR__ . '/index.html';
if (!file_exists($htmlFile)) {
    http_response_code(404);
    echo "index.html not found";
    exit;
}

$html = file_get_contents($htmlFile);

$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = trim($requestUri, '/');

// Default Fallback Metadata
$title = "Softnics Media | Digital Marketing & Creative Agency";
$description = "Elevating your brand with powerful digital, creative, and production solutions.";
$keywords = "digital marketing, creative agency, web development, video production, branding";
$canonical = "https://www.softnicsmedia.com/" . $path;
$ogTitle = $title;
$ogDescription = $description;
$ogImage = "https://www.softnicsmedia.com/assets/logo-DSZrowXZ.png";
$twitterTitle = $title;
$twitterDescription = $description;
$twitterImage = $ogImage;
$schema = "";
$customHeader = "";

$matched = false;

// 1. Service Detail Pages: /services/{slug}
if (preg_match('#^services/([a-zA-Z0-9_-]+)$#i', $path, $matches)) {
    $slug = $matches[1];
    $apiUrl = "https://api.softnicsmedia.com/api/services/" . urlencode($slug);
    
    $ctx = stream_context_create([
        'http' => [
            'timeout' => 2,
            'ignore_errors' => true,
        ]
    ]);
    $json = @file_get_contents($apiUrl, false, $ctx);
    if ($json) {
        $svc = json_decode($json, true);
        if ($svc && !empty($svc['title'])) {
            $matched = true;
            $title = !empty($svc['metaTitle']) ? $svc['metaTitle'] : $svc['title'] . " | Softnics Media";
            $description = !empty($svc['metaDescription']) 
                ? $svc['metaDescription'] 
                : (!empty($svc['description']) ? $svc['description'] : (!empty($svc['intro']) ? $svc['intro'] : $description));
            $keywords = !empty($svc['metaKeywords']) ? $svc['metaKeywords'] : $keywords;
            $canonical = !empty($svc['canonicalUrl']) ? $svc['canonicalUrl'] : "https://www.softnicsmedia.com/services/" . $slug;
            $ogTitle = !empty($svc['ogTitle']) ? $svc['ogTitle'] : $title;
            $ogDescription = !empty($svc['ogDescription']) ? $svc['ogDescription'] : $description;
            if (!empty($svc['image'])) $ogImage = $svc['image'];
            elseif (!empty($svc['icon'])) $ogImage = $svc['icon'];
            $twitterTitle = !empty($svc['twitterTitle']) ? $svc['twitterTitle'] : $title;
            $twitterDescription = !empty($svc['twitterDescription']) ? $svc['twitterDescription'] : $description;
            $twitterImage = $ogImage;
            $schema = !empty($svc['schemaCode']) ? $svc['schemaCode'] : "";
            $customHeader = !empty($svc['customHeaderCode']) ? $svc['customHeaderCode'] : "";
        }
    }
}
// 2. Blog Detail Pages: /blog/{slug}
elseif (preg_match('#^blog/([a-zA-Z0-9_-]+)$#i', $path, $matches)) {
    $slug = $matches[1];
    $apiUrl = "https://api.softnicsmedia.com/api/blogs/" . urlencode($slug);
    
    $ctx = stream_context_create([
        'http' => [
            'timeout' => 2,
            'ignore_errors' => true,
        ]
    ]);
    $json = @file_get_contents($apiUrl, false, $ctx);
    if ($json) {
        $blog = json_decode($json, true);
        if ($blog && !empty($blog['title'])) {
            $matched = true;
            $title = !empty($blog['metaTitle']) ? $blog['metaTitle'] : $blog['title'] . " | Softnics Media";
            $description = !empty($blog['metaDescription']) 
                ? $blog['metaDescription'] 
                : (!empty($blog['shortDesc']) ? $blog['shortDesc'] : $description);
            $keywords = !empty($blog['metaKeywords']) ? $blog['metaKeywords'] : $keywords;
            $canonical = !empty($blog['canonicalUrl']) ? $blog['canonicalUrl'] : "https://www.softnicsmedia.com/blog/" . $slug;
            $ogTitle = !empty($blog['ogTitle']) ? $blog['ogTitle'] : $title;
            $ogDescription = !empty($blog['ogDescription']) ? $blog['ogDescription'] : $description;
            if (!empty($blog['image'])) $ogImage = $blog['image'];
            $twitterTitle = !empty($blog['twitterTitle']) ? $blog['twitterTitle'] : $title;
            $twitterDescription = !empty($blog['twitterDescription']) ? $blog['twitterDescription'] : $description;
            $twitterImage = $ogImage;
            $schema = !empty($blog['schemaCode']) ? $blog['schemaCode'] : "";
            $customHeader = !empty($blog['customHeaderCode']) ? $blog['customHeaderCode'] : "";
        }
    }
}

// Build SEO meta tags block for <head>
$seoTags = "\n    <!-- SEO & Social Meta Tags (Server Rendered for View Source & Crawlers) -->\n";
$seoTags .= "    <title>" . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . "</title>\n";
$seoTags .= "    <meta name=\"description\" content=\"" . htmlspecialchars($description, ENT_QUOTES, 'UTF-8') . "\" />\n";
if (!empty($keywords)) {
    $seoTags .= "    <meta name=\"keywords\" content=\"" . htmlspecialchars($keywords, ENT_QUOTES, 'UTF-8') . "\" />\n";
}
$seoTags .= "    <link rel=\"canonical\" href=\"" . htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') . "\" />\n";
$seoTags .= "    <meta property=\"og:title\" content=\"" . htmlspecialchars($ogTitle, ENT_QUOTES, 'UTF-8') . "\" />\n";
$seoTags .= "    <meta property=\"og:description\" content=\"" . htmlspecialchars($ogDescription, ENT_QUOTES, 'UTF-8') . "\" />\n";
$seoTags .= "    <meta property=\"og:url\" content=\"" . htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8') . "\" />\n";
$seoTags .= "    <meta property=\"og:image\" content=\"" . htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8') . "\" />\n";
$seoTags .= "    <meta property=\"og:type\" content=\"article\" />\n";
$seoTags .= "    <meta name=\"twitter:card\" content=\"summary_large_image\" />\n";
$seoTags .= "    <meta name=\"twitter:title\" content=\"" . htmlspecialchars($twitterTitle, ENT_QUOTES, 'UTF-8') . "\" />\n";
$seoTags .= "    <meta name=\"twitter:description\" content=\"" . htmlspecialchars($twitterDescription, ENT_QUOTES, 'UTF-8') . "\" />\n";
$seoTags .= "    <meta name=\"twitter:image\" content=\"" . htmlspecialchars($twitterImage, ENT_QUOTES, 'UTF-8') . "\" />\n";

if (!empty($schema)) {
    $cleanSchema = trim($schema);
    if (!preg_match('#^<script#i', $cleanSchema)) {
        $cleanSchema = "<script type=\"application/ld+json\">\n" . $cleanSchema . "\n</script>";
    }
    $seoTags .= "    " . $cleanSchema . "\n";
}

if (!empty($customHeader)) {
    $seoTags .= "    " . trim($customHeader) . "\n";
}

// Replace static <title>...</title> with full SEO tags block
if (stripos($html, '<title>') !== false) {
    $html = preg_replace('#<title>.*?</title>#i', $seoTags, $html, 1);
} else {
    $html = str_ireplace('</head>', $seoTags . '</head>', $html);
}

header('Content-Type: text/html; charset=UTF-8');
echo $html;
