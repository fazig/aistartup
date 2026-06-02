"use server";

export async function analyzeLinks(url: string) {
  let targetUrl = url.trim();
  if (!targetUrl) return { error: "Please enter a valid URL." };

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  try {
    const response = await fetch(targetUrl, { 
      headers: { "User-Agent": "StartupAI-LinkBot" }
    });

    const html = await response.text();
    
    // Very basic regex to find all <a href="..."> tags
    const anchorTags = html.match(/<as+(?:[^>]*?s+)?href=["']([^"']+)["']/gi) || [];
    
    const links = anchorTags.map(tag => {
      const match = tag.match(/href=["']([^"']+)["']/i);
      return match ? match[1] : "";
    }).filter(link => link.length > 0 && !link.startsWith("#") && !link.startsWith("javascript:"));

    let internal = 0;
    let external = 0;
    
    // Parse the host to determine internal vs external
    let hostObj;
    try {
      hostObj = new URL(targetUrl);
    } catch(e) {
      return { error: "Invalid base URL structure." };
    }

    const analyzedLinks = links.map(href => {
      let isExternal = false;
      let finalUrl = href;

      if (href.startsWith("http://") || href.startsWith("https://")) {
        try {
          const lUrl = new URL(href);
          if (lUrl.host !== hostObj.host) {
            isExternal = true;
          }
        } catch(e) {
          isExternal = true;
        }
      } else {
        // It's a relative path, so it's internal
        isExternal = false;
        // Make it absolute for display purposes
        if (href.startsWith("/")) {
          finalUrl = `${hostObj.protocol}//${hostObj.host}${href}`;
        } else {
          finalUrl = `${hostObj.protocol}//${hostObj.host}/${href}`;
        }
      }

      if (isExternal) external++;
      else internal++;

      return {
        url: finalUrl,
        type: isExternal ? "External" : "Internal"
      };
    });

    return {
      success: true,
      url: targetUrl,
      total: analyzedLinks.length,
      internal,
      external,
      // return a sample of up to 100 links to prevent massive DOM overload on client
      links: analyzedLinks.slice(0, 100)
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Could not fetch the webpage to analyze links.",
    };
  }
}
