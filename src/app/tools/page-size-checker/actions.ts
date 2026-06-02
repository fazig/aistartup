"use server";

export async function checkPageSize(url: string) {
  let targetUrl = url.trim();
  if (!targetUrl) return { error: "Please enter a valid URL." };

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  try {
    const response = await fetch(targetUrl, { 
      headers: { "User-Agent": "StartupAI-Size-Bot" }
    });

    const text = await response.text();
    const bytes = new TextEncoder().encode(text).length;

    return {
      success: true,
      url: targetUrl,
      bytes: bytes,
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Could not fetch the webpage. The server may be offline or blocking our bot.",
    };
  }
}
