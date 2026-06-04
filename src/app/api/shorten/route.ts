import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, provider = "isgd" } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    // Validate URL syntax
    try {
      new URL(targetUrl);
    } catch (_) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    let shortUrl = "";

    if (provider === "isgd") {
      try {
        const res = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(targetUrl)}`, {
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.shorturl) {
            shortUrl = data.shorturl;
          } else if (data.errormessage) {
            throw new Error(data.errormessage);
          }
        }
      } catch (err) {
        console.error("is.gd shortening failed, falling back to tinyurl", err);
      }
    }

    // Fallback or explicit tinyurl
    if (!shortUrl) {
      try {
        const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(targetUrl)}`, {
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const text = await res.text();
          if (text.startsWith("http")) {
            shortUrl = text.trim();
          }
        }
      } catch (err) {
        console.error("tinyurl shortening failed", err);
      }
    }

    if (!shortUrl) {
      return NextResponse.json({ error: "Failed to shorten the URL. Both shortener APIs failed." }, { status: 500 });
    }

    return NextResponse.json({ originalUrl: targetUrl, shortUrl });
  } catch (error) {
    console.error("Error in shorten API route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
