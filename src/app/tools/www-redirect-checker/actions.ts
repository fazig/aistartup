"use server";

export async function checkWwwRedirect(url: string) {
  let targetUrl = url.trim().toLowerCase();
  if (!targetUrl) return { error: "Please enter a valid URL." };

  // Strip protocols and www to get the bare domain
  let bareDomain = targetUrl.replace(/^https?:\/\//, "");
  bareDomain = bareDomain.replace(/^www\./, "");
  bareDomain = bareDomain.split('/')[0];

  const urlNonWww = `http://${bareDomain}`;
  const urlWww = `http://www.${bareDomain}`;

  try {
    // 1. Check non-WWW
    const resNonWww = await fetch(urlNonWww, { method: "HEAD", redirect: "manual", cache: "no-store" });
    const nonWwwStatus = resNonWww.status;
    const nonWwwLocation = resNonWww.headers.get("location");

    // 2. Check WWW
    const resWww = await fetch(urlWww, { method: "HEAD", redirect: "manual", cache: "no-store" });
    const wwwStatus = resWww.status;
    const wwwLocation = resWww.headers.get("location");

    return {
      success: true,
      domain: bareDomain,
      nonWww: {
        status: nonWwwStatus,
        redirectsTo: nonWwwLocation || null,
        is301: nonWwwStatus === 301
      },
      www: {
        status: wwwStatus,
        redirectsTo: wwwLocation || null,
        is301: wwwStatus === 301
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Could not reach the server to verify redirect rules. The domain may not exist.",
    };
  }
}
