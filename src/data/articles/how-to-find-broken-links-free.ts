import { BlogPost } from "../posts";
export const postHowToFindBrokenLinksFree: BlogPost = {
  slug: "how-to-find-broken-links-free",
  title: "How to Find Broken Links on Your Site Free (2026 Guide)",
  description: "Find broken links on your site free with 7 proven methods, from Screaming Frog and Google Search Console to no-install web checkers. Fix 404s fast.",
  date: "September 23, 2026",
  readTime: "6 min read",
  category: "SEO & Marketing",
  author: "Faizan Arif",
  image: "/how-to-find-broken-links-free_cover.webp",
  content: `![How to Find Broken Links on Your Site Free (2026 Guide)](/how-to-find-broken-links-free_cover.webp)

Broken links are the silent rot of a website. A dead link on a high-traffic page bounces visitors, wastes the link equity you worked hard to earn, and over time signals poor site health to search engines. The good news: you do not need a paid SEO suite to find them. Here are seven free ways to hunt down every broken link on your site, from quick web-based scans to full crawls.

## 1. Screaming Frog SEO Spider (free up to 500 URLs)

The most powerful free option is the desktop crawler Screaming Frog SEO Spider. Download it, enter your domain, hit Start, and it crawls your site the way Googlebot does. Then filter by Response Codes → Client Error (4xx) to see every 404 and every page that links to it.

The free license covers 500 URLs, which is plenty for blogs, portfolios, and small business sites. The report shows not just the dead URL but the source page containing the link, so fixing is straightforward. For anything larger than 500 pages, pair it with one of the web-based options below.

One practical tip: after your first crawl, export the 4xx report as a CSV and keep it. Re-crawl after you finish fixing and diff the two files — anything still present either did not get redirected properly or is cached somewhere, like an old RSS feed or sitemap entry you forgot to update.

## 2. Google Search Console (free, authoritative)

Google Search Console's Pages report shows exactly which URLs Google tried to crawl and hit errors on — 404s, server errors, and soft 404s — straight from Google's own index. Go to Pages → Not found (404) and you will see the broken URLs Google has encountered.

Its limitation is perspective: it reports URLs Google found, not every dead link your visitors click. It also focuses on your site's URLs rather than external links you point to. Still, it is free, official, and should be every webmaster's first stop.

## 3. Dead Link Checker (free web-based scan)

Dead Link Checker is a browser-based tool that crawls your whole site and checks every internal and external link, then produces a report of what is dead and which page each broken link lives on. No installation and no account needed for a basic single-site check.

It also offers auto-check, which re-scans your site on a schedule and emails you a report — useful for keeping a growing site clean without remembering to check. Be warned that very large sites take a while, and multi-site management needs a free account.

## 4. W3C Link Checker (free, no install)

The W3C Link Checker is one of the oldest link validators on the web, and it still works well for spot checks. Paste a page URL and it verifies every link on that page, with an option for recursive checking that follows links deeper into your site.

The interface looks dated, and it throttles politely to avoid hammering servers, so it is slow for large sites. But it requires no installation or signup, and its output is standards-grade — handy when you want a reproducible validation for a specific page.

## 5. Ahrefs' free Broken Link Checker

Ahrefs offers a free broken link checker that reports dead inbound and outbound links using its link database. It is particularly useful for finding broken links pointing *to* your site — pages where an external site links to a URL on your domain that no longer exists. Those are link-reclamation opportunities: contact the site owner or set up a 301 redirect and recover lost equity.

The free tool has usage limits and deeper workflows push toward a paid plan, but for quick one-off checks it is one of the best interfaces available.

## 6. BrokenLinkCheck.com (free, generous limits)

BrokenLinkCheck.com scans your site from the browser with a free tier that covers several thousand pages per run with no cap on the number of hyperlinks checked within those pages. That makes it one of the most generous free web-based options for medium-sized sites that exceed Screaming Frog's 500-URL free limit.

Its reports show the dead links per page, and it is a good middle ground: no install, no 500-page ceiling, and fast enough for regular audits.

## 7. HTTPStatus.io (free bulk URL checking)

Sometimes you already have a list of suspect URLs — exported from your CMS, a spreadsheet, or a previous scan — and just need to verify them in bulk. HTTPStatus.io lets you paste up to a list of URLs and get back each one's status code and full redirect path for free.

It will not discover links on its own, but it is the fastest way to validate a redirect chain or confirm that last week's fixes actually resolved. Free web usage may be rate-limited, so batch very large lists.

## Fixing what you find

Finding the broken links is only half the job. Work through the report methodically:

- **Internal 404s:** These are always your fault and always fixable. Either restore the page, redirect it with a 301 to the closest relevant page, or update the link to the correct URL.
- **External links that died:** You cannot fix someone else's site. Replace the link with a working alternative, or link to an archived copy on the Wayback Machine if the content matters.
- **Redirect chains:** A link that hops through two or three redirects before landing works, but slowly. Update it to point at the final destination directly.
- **Broken images:** Checkers often flag missing images too. Replace or re-upload the asset.

## Set up a repeat routine

One-time scans decay fast — every redesign, migration, or content cleanup creates fresh dead ends. Pick one method from above and run it monthly. If you use WordPress, the free Broken Link Checker plugin can monitor in the background and email you when something breaks. For everyone else, a calendar reminder plus Screaming Frog's free tier is a perfectly serviceable routine that costs nothing.

## Key takeaways
- Broken links hurt UX, conversions, and search visibility — audit them regularly.
- Screaming Frog (free, 500 URLs) plus Google Search Console covers most sites completely.
- Web-based scanners like Dead Link Checker and BrokenLinkCheck.com need no install.
- Ahrefs' free checker finds broken *inbound* links — prime redirect opportunities.
- Always fix internal 404s with 301 redirects; replace dead external links.
- Schedule monthly scans so new breakage never accumulates.`,
};
