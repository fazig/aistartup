"use server";

export async function fetchSourceCode(url: string) {
  let targetUrl = url.trim();
  if (!targetUrl) return { error: "Please enter a valid URL." };

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  try {
    const response = await fetch(targetUrl, { 
      headers: { "User-Agent": "StartupAI-Source-Bot" }
    });

    const text = await response.text();

    return {
      success: true,
      url: targetUrl,
      sourceCode: text,
      size: text.length
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Could not fetch the source code. The website may be offline or blocking our bot.",
    };
  }
}
