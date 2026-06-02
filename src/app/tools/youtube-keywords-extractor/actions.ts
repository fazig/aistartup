"use server";

export async function extractYoutubeKeywords(url: string) {
  let targetUrl = url.trim();
  if (!targetUrl) return { error: "Please enter a valid URL." };

  if (!targetUrl.includes("youtube.com/watch?v=") && !targetUrl.includes("youtu.be/")) {
    return { error: "Invalid URL. Please enter a valid YouTube video link." };
  }

  try {
    const response = await fetch(targetUrl, { 
      headers: { 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    const html = await response.text();
    
    // Extract keywords using regex from the <meta name="keywords" content="..."> tag
    const keywordsMatch = html.match(/<metas+name="keywords"s+content="([^"]+)">/i);
    const titleMatch = html.match(/<title>(.*?)</title>/i);

    if (!keywordsMatch) {
      return {
        success: true,
        title: titleMatch ? titleMatch[1].replace(" - YouTube", "") : "Unknown Video",
        keywords: [],
        message: "This video does not have any hidden SEO tags configured."
      };
    }

    // YouTube comma separates them
    const keywordsRaw = keywordsMatch[1];
    const keywordsArray = keywordsRaw.split(',').map(k => k.trim()).filter(k => k.length > 0);

    return {
      success: true,
      url: targetUrl,
      title: titleMatch ? titleMatch[1].replace(" - YouTube", "") : "Unknown Video",
      keywords: keywordsArray
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Could not fetch data from YouTube. The video might be private or deleted.",
    };
  }
}
