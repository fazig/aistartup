"use server";

export async function checkCodeToTextRatio(url: string) {
  let targetUrl = url.trim();
  if (!targetUrl) return { error: "Please enter a valid URL." };

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  try {
    const response = await fetch(targetUrl, { 
      headers: { "User-Agent": "StartupAI-RatioBot" }
    });

    const html = await response.text();
    const totalHtmlSize = new TextEncoder().encode(html).length;
    
    // Very basic regex to strip HTML tags, script tags, style tags and comments to get pure text
    // Note: On a real backend we'd use Cheerio, but we are keeping dependencies light
    let textContent = html;
    
    // Remove script blocks
    textContent = textContent.replace(/<scriptb[^<]*(?:(?!</script>)<[^<]*)*</script>/gi, ' ');
    // Remove style blocks
    textContent = textContent.replace(/<styleb[^<]*(?:(?!</style>)<[^<]*)*</style>/gi, ' ');
    // Remove comments
    textContent = textContent.replace(/<!--[sS]*?-->/g, ' ');
    // Remove HTML tags
    textContent = textContent.replace(/<[^>]+>/g, ' ');
    // Replace multiple spaces/newlines with single space
    textContent = textContent.replace(/s+/g, ' ').trim();

    const textOnlySize = new TextEncoder().encode(textContent).length;
    const codeOnlySize = totalHtmlSize - textOnlySize;
    
    const ratio = totalHtmlSize > 0 ? (textOnlySize / totalHtmlSize) * 100 : 0;

    return {
      success: true,
      url: targetUrl,
      totalHtmlSize,
      textOnlySize,
      codeOnlySize,
      ratio: Number(ratio.toFixed(2))
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Could not fetch the webpage to analyze its code to text ratio.",
    };
  }
}
