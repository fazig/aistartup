import { NextResponse } from "next/server";

// Simple domain parser to extract the apex/root domain
function getRootDomain(hostname: string): string {
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const last = parts[parts.length - 1];
    const secondLast = parts[parts.length - 2];
    // Check if it's a double extension like .co.uk or .com.br
    if (secondLast.length <= 3 && last.length <= 3 && parts.length > 3) {
      return parts.slice(-3).join('.');
    }
    return parts.slice(-2).join('.');
  }
  return hostname;
}

// Fetch domain age using RDAP
async function getDomainAgeInMonths(domain: string): Promise<{ months: number; passed: boolean; error?: string }> {
  try {
    const rootDomain = getRootDomain(domain);
    const rdapUrl = `https://rdap.org/domain/${rootDomain}`;
    const res = await fetch(rdapUrl, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) {
      throw new Error(`RDAP request returned ${res.status}`);
    }
    const data = await res.json();
    const events = data.events || [];
    const registrationEvent = events.find((e: any) => e.action === 'registration');
    
    if (registrationEvent && registrationEvent.eventDate) {
      const regDate = new Date(registrationEvent.eventDate);
      const diffTime = Math.abs(new Date().getTime() - regDate.getTime());
      const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.4375));
      return { months: diffMonths, passed: diffMonths >= 6 };
    }
    
    const fallbackEvent = events.find((e: any) => e.action === 'last changed' || e.action === 'check-in');
    if (fallbackEvent && fallbackEvent.eventDate) {
      const fallbackDate = new Date(fallbackEvent.eventDate);
      const diffTime = Math.abs(new Date().getTime() - fallbackDate.getTime());
      const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.4375));
      return { months: diffMonths, passed: diffMonths >= 6 };
    }

    return { months: 8, passed: true }; // default passed if we can't find but RDAP succeeded
  } catch (error) {
    console.error("RDAP error:", error);
    // Return a default age of 8 months if RDAP fails (to prevent breaking the score entirely) but mark it with error
    return { months: 8, passed: true, error: "Unable to retrieve registration details" };
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    const parsedUrl = new URL(targetUrl);
    const domain = parsedUrl.origin;
    const hostname = parsedUrl.hostname;

    const results: any = {
      domain: hostname,
      isHttps: parsedUrl.protocol === 'https:',
      domainAgeMonths: 0,
      domainAgePassed: false,
      ttfbMs: 0,
      ttfbStatus: 'good',
      pageSizeKb: 0,
      wordCount: 0,
      hasSufficientWords: false,
      h1Count: 0,
      h2Count: 0,
      h1Status: 'missing',
      imagesCount: 0,
      imagesWithAltCount: 0,
      altStatus: 'none',
      hasPrivacyPolicy: false,
      hasTerms: false,
      hasContact: false,
      hasAbout: false,
      hasRobotsTxt: false,
      hasSitemapXml: false,
      hasAdsTxt: false,
      securityHeaders: {
        csp: false,
        hsts: false,
        xFrameOptions: false,
        xContentTypeOptions: false,
      },
      score: 0,
      approvalProbability: 'Low'
    };

    // 1. Fetch domain age
    const ageResult = await getDomainAgeInMonths(hostname);
    results.domainAgeMonths = ageResult.months;
    results.domainAgePassed = ageResult.passed;

    // 2. Fetch main page and record TTFB & response data
    const startTime = performance.now();
    try {
      const response = await fetch(targetUrl, { 
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 AdSenseApprovalChecker/2.0'
        },
        signal: AbortSignal.timeout(8000)
      });
      
      const endTime = performance.now();
      results.ttfbMs = Math.round(endTime - startTime);
      
      if (results.ttfbMs < 400) {
        results.ttfbStatus = 'excellent';
      } else if (results.ttfbMs < 1000) {
        results.ttfbStatus = 'good';
      } else {
        results.ttfbStatus = 'slow';
      }

      if (response.ok) {
        const html = await response.text();
        results.pageSizeKb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);

        // Security headers check
        results.securityHeaders.csp = response.headers.has('content-security-policy');
        results.securityHeaders.hsts = response.headers.has('strict-transport-security');
        results.securityHeaders.xFrameOptions = response.headers.has('x-frame-options');
        results.securityHeaders.xContentTypeOptions = response.headers.has('x-content-type-options');

        const htmlLower = html.toLowerCase();

        // Legal & Essential Links check in raw HTML
        results.hasPrivacyPolicy = /href=["'][^"']*(privacy)[^"']*["']/i.test(htmlLower);
        results.hasTerms = /href=["'][^"']*(terms|tos|condition|agreement)[^"']*["']/i.test(htmlLower);
        results.hasContact = /href=["'][^"']*(contact|support|write-to-us)[^"']*["']/i.test(htmlLower);
        results.hasAbout = /href=["'][^"']*(about|story|who-we-are)[^"']*["']/i.test(htmlLower);

        // Heading tags
        const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
        const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
        results.h1Count = h1Matches.length;
        results.h2Count = h2Matches.length;
        results.h1Status = results.h1Count === 1 ? 'perfect' : (results.h1Count === 0 ? 'missing' : 'multiple');

        // Alt tags on images
        const imgMatches = html.match(/<img[^>]*>/gi) || [];
        results.imagesCount = imgMatches.length;
        let imagesWithAlt = 0;
        imgMatches.forEach(img => {
          if (/alt\s*=\s*["']([^"']+)["']/i.test(img)) {
            imagesWithAlt++;
          }
        });
        results.imagesWithAltCount = imagesWithAlt;
        results.altStatus = results.imagesCount === 0 ? 'perfect' : (imagesWithAlt === results.imagesCount ? 'perfect' : (imagesWithAlt > 0 ? 'needs_work' : 'none'));

        // HTML word count
        let bodyText = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]*>?/gm, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        results.wordCount = bodyText.split(/\s+/).filter(w => w.length > 0).length;
        results.hasSufficientWords = results.wordCount > 600;
      }
    } catch (e) {
      console.error("Error fetching homepage:", e);
    }

    // 3. Check robots.txt
    try {
      const robotsRes = await fetch(`${domain}/robots.txt`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AdSenseApprovalChecker/2.0)' },
        signal: AbortSignal.timeout(3000)
      });
      if (robotsRes.ok) {
        results.hasRobotsTxt = true;
      }
    } catch (e) {
      console.error("Error checking robots.txt:", e);
    }

    // 4. Check sitemap.xml
    try {
      const sitemapRes = await fetch(`${domain}/sitemap.xml`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AdSenseApprovalChecker/2.0)' },
        signal: AbortSignal.timeout(3000)
      });
      if (sitemapRes.ok) {
        results.hasSitemapXml = true;
      }
    } catch (e) {
      console.error("Error checking sitemap.xml:", e);
    }

    // 5. Check ads.txt
    try {
      const adsRes = await fetch(`${domain}/ads.txt`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AdSenseApprovalChecker/2.0)' },
        signal: AbortSignal.timeout(3000)
      });
      if (adsRes.ok) {
        results.hasAdsTxt = true;
      }
    } catch (e) {
      console.error("Error checking ads.txt:", e);
    }

    // --- SCORING SYSTEM (Max: 100 points) ---
    let score = 0;

    // A. Domain Age (10 points)
    if (results.domainAgeMonths >= 6) score += 10;
    else if (results.domainAgeMonths >= 3) score += 6;
    else if (results.domainAgeMonths > 0) score += 2;
    else score += 8; // default RDAP fetch error fallback

    // B. HTTPS protocol (15 points)
    if (results.isHttps) score += 15;

    // C. Performance & TTFB (10 points)
    if (results.ttfbMs > 0) {
      if (results.ttfbMs < 400) score += 10;
      else if (results.ttfbMs < 1000) score += 7;
      else score += 3;
    } else {
      score += 5; // fallback
    }

    // D. Content Quality & Words (25 points)
    if (results.wordCount >= 1000) score += 25;
    else if (results.wordCount >= 600) score += 20;
    else if (results.wordCount >= 300) score += 12;
    else if (results.wordCount > 0) score += 4;

    // E. Legal & Mandatory Pages (20 points)
    if (results.hasPrivacyPolicy) score += 6;
    if (results.hasTerms) score += 6;
    if (results.hasContact) score += 4;
    if (results.hasAbout) score += 4;

    // F. Crawlability (10 points)
    if (results.hasRobotsTxt) score += 4;
    if (results.hasSitemapXml) score += 3;
    if (results.hasAdsTxt) score += 3;

    // G. Heading Structure & Alt Tags (10 points)
    if (results.h1Status === 'perfect') score += 5;
    if (results.altStatus === 'perfect') score += 5;
    else if (results.altStatus === 'needs_work') score += 3;

    results.score = score;

    // Determine probability category
    if (score >= 80) {
      results.approvalProbability = "High";
    } else if (score >= 50) {
      results.approvalProbability = "Medium";
    } else {
      results.approvalProbability = "Low";
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in AdSense checker API:", error);
    return NextResponse.json({ error: "Failed to process the URL." }, { status: 500 });
  }
}
