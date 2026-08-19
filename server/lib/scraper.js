/**
 * Deep multi-page website crawler.
 *
 * 1. Fetches the root homepage HTML.
 * 2. Discovers internal links (About, Services, Solutions, Pricing, Products, Contact, Case Studies).
 * 3. Concurrently crawls up to 5 high-priority sub-pages.
 * 4. Compiles a rich multi-page business dossier (up to 75,000 chars).
 */

/**
 * Fetches raw HTML from a URL with browser-like headers and a 12-second timeout.
 */
export async function fetchPageHtml(targetUrl) {
  const response = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return await response.text();
}

/**
 * Strips all HTML tags, scripts, styles, and returns pure visible text.
 */
export function extractCleanText(html) {
  let text = html.replace(/<(script|style|head|noscript|svg|iframe)\b[^>]*>([\s\S]*?)<\/\1>/gi, ' ');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Determines if a string looks like a domain/URL rather than a plain company name.
 */
export function isDomainOrUrl(str) {
  const cleaned = str.trim().replace(/^https?:\/\//i, '');
  return /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/.*)?$/.test(cleaned);
}

/**
 * Deep-crawls a website: fetches homepage, discovers internal links,
 * crawls up to 5 priority sub-pages in parallel, and compiles a dossier.
 */
export async function scrapeUrlText(url) {
  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const parsedBase = new URL(targetUrl);
    const baseHostname = parsedBase.hostname.replace(/^www\./i, '');

    console.log(`[Scraper] Fetching root homepage: ${targetUrl}`);
    const homeHtml = await fetchPageHtml(targetUrl);
    const homeCleanText = extractCleanText(homeHtml);

    // Discover internal links
    const linkRegex = /href=["']([^"']+)["']/gi;
    const discoveredLinks = new Set();
    let match;
    while ((match = linkRegex.exec(homeHtml)) !== null) {
      const rawHref = match[1].trim();
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript:') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
        continue;
      }
      try {
        const resolved = new URL(rawHref, targetUrl);
        const resolvedHost = resolved.hostname.replace(/^www\./i, '');
        if (
          resolvedHost === baseHostname &&
          resolved.pathname !== '/' &&
          !resolved.pathname.match(/\.(png|jpg|jpeg|gif|svg|pdf|zip|css|js|webp|ico|mp4)$/i)
        ) {
          discoveredLinks.add(resolved.origin + resolved.pathname);
        }
      } catch {
        // Skip invalid URL
      }
    }

    // Prioritize high-value business sub-pages
    const priorityKeywords = ['about', 'service', 'solution', 'product', 'pricing', 'plan', 'feature', 'how', 'work', 'case-stud', 'contact'];
    const prioritizedUrls = [];

    for (const keyword of priorityKeywords) {
      for (const link of discoveredLinks) {
        if (link.toLowerCase().includes(keyword) && !prioritizedUrls.includes(link) && prioritizedUrls.length < 5) {
          prioritizedUrls.push(link);
        }
      }
    }

    // Fill remaining slots with other internal links
    if (prioritizedUrls.length < 5) {
      for (const link of discoveredLinks) {
        if (!prioritizedUrls.includes(link) && prioritizedUrls.length < 5) {
          prioritizedUrls.push(link);
        }
      }
    }

    console.log(`[Scraper] Discovered ${discoveredLinks.size} internal links. Crawling ${prioritizedUrls.length} key sub-pages:`, prioritizedUrls);

    // Concurrently crawl sub-pages
    const pageResults = await Promise.allSettled(
      prioritizedUrls.map(async (subUrl) => {
        try {
          const subHtml = await fetchPageHtml(subUrl);
          const subText = extractCleanText(subHtml);
          return { url: subUrl, text: subText.substring(0, 12000) };
        } catch (err) {
          console.warn(`[Scraper] Skipping sub-page ${subUrl}:`, err.message || err);
          return null;
        }
      })
    );

    // Compile comprehensive multi-page dossier
    let dossier = `=== HOMEPAGE (${targetUrl}) ===\n${homeCleanText.substring(0, 25000)}\n\n`;

    pageResults.forEach((res) => {
      if (res.status === 'fulfilled' && res.value && res.value.text) {
        dossier += `=== SUB-PAGE: ${res.value.url} ===\n${res.value.text}\n\n`;
      }
    });

    console.log(`[Scraper] Deep crawl complete. Total dossier: ${dossier.length} characters.`);
    return dossier.substring(0, 75000);
  } catch (error) {
    console.error(`[Scraper] Failed to crawl ${url}:`, error.message || error);
    throw new Error(`Could not read website: ${error.message}`);
  }
}
