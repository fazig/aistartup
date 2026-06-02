"use server";

export async function checkServerStatus(url: string) {
  let targetUrl = url.trim();
  if (!targetUrl) return { error: "Please enter a valid URL." };

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  const startTime = Date.now();

  try {
    const response = await fetch(targetUrl, { 
      method: "HEAD", 
      cache: "no-store",
      headers: { "User-Agent": "StartupAI-Server-Status-Bot" }
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      success: true,
      url: targetUrl,
      status: response.status,
      statusText: response.statusText,
      responseTime: responseTime,
      server: response.headers.get("server") || "Unknown/Hidden",
    };
  } catch (error: any) {
    return {
      success: false,
      url: targetUrl,
      error: "Server is unreachable, DNS failed, or connection timed out.",
    };
  }
}
