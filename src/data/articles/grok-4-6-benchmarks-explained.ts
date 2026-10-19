import { BlogPost } from "../posts";
export const postGrok46BenchmarksExplained: BlogPost = {
  slug: "grok-4-6-benchmarks-explained",
  title: "Grok 4.6 Benchmarks Explained: Scores, Price, Value",
  description: "Grok 4.6 benchmarks explained: a 61 on the Artificial Analysis Intelligence Index, $2/$6 token pricing, full results vs GPT-5.6 Sol and Grok 4.5, plus tips.",
  date: "October 19, 2026",
  readTime: "6 min read",
  category: "Tech News",
  author: "Faizan Arif",
  image: "/grok-4-6-benchmarks-explained_cover.webp",
  content: `![Grok 4.6 Benchmarks Explained: Scores, Price, Value](/grok-4-6-benchmarks-explained_cover.webp)

Grok 4.6 arrived on August 12, 2026 with a headline claim that caught the whole AI press off guard: flagship-tier scores at a fraction of flagship prices. SpaceXAI (the company formerly known as xAI) says it ties GPT-5.6 Sol on the industry's leading composite index while charging more than 60% less. This article walks through the actual benchmark numbers, what they measure, the pricing trap buried in the rate card, and whether Grok 4.5 users should switch.

## What Grok 4.6 actually is

Grok 4.6 is not a new foundation model. SpaceXAI kept the same base as Grok 4.5 and put the engineering effort into post-training: extended supplemental training, regenerated supervised fine-tuning trajectories, and reinforcement learning inside agentic environments covering knowledge work, coding, web development, and computer-aided design. Per DEV Community's technical analysis, the underlying base is a 1.5-trillion-parameter model.

That matters when you read the scores. A post-training upgrade can sharpen specific behaviors — long-horizon agentic work, self-verification — without changing the model's fundamental knowledge or reasoning ceiling. SpaceXAI's own framing is that on longer task trajectories, the model shows more self-testing and verification, checking its own work before moving on. That is the specific capability gap over 4.5, more than any single score jump.

The release specs: a 500,000-token context window, a new "xhigh" reasoning tier on top of the existing low, medium, and high settings, text-plus-image input with text-only output, and a knowledge cutoff of February 1, 2026.

## The headline score: 61 on the Artificial Analysis Intelligence Index

The Artificial Analysis Intelligence Index is a composite of nine benchmarks, and it is the score SpaceXAI leads with. Grok 4.6 scores 61. For context:

- GPT-5.6 Sol Max: 61 (tied)
- Claude Fable 5 Max: 62 (one point ahead)
- Claude Opus 5: 63 (leads, at maximum reasoning effort)
- Grok 4.5 High: 56 (five points behind — Grok 4.6's predecessor)

A five-point generational rise on the same index is one of the largest single-release jumps the index has recorded. The important framing is price: Grok 4.6 charges $2 per million input tokens and $6 per million output tokens — unchanged from Grok 4.5 — which Artificial Analysis measures as more than 60% below both models it now matches on the index.

Important caveat: these are vendor-reported figures from SpaceXAI's launch materials and Artificial Analysis reporting, not independent measurements. Composite indexes weight benchmarks their own way, so a tied score does not mean tied performance on your workload.

## Coding and agentic benchmarks, broken down

The index score is the headline, but the individual benchmarks tell you where the model is strong and where it lags. Here are the figures SpaceXAI published, with the comparison numbers that were reported alongside them:

- **GDPval-AA v2:** 1753 Elo (Grok 4.5: 1526) — a large jump on agentic knowledge work.
- **AA-Briefcase:** 1577 (Grok 4.5: 1313) — same story, big generational gain.
- **Terminal-Bench v3.0:** 26% (Grok 4.5: 15.7%) — nearly doubled on terminal-based agent tasks.
- **CursorBench v3.2:** 69.9% (Grok 4.5: 66.7%) — a modest but real improvement on coding-assistant tasks.
- **APEX-Agents:** 57.5% — reported ahead of GPT-5.6 Sol on this agent suite.
- **FrontierCode v1.1 Extended:** 61.3% — no comparison published.
- **DeepSWE v1.1:** 65.9% — here GPT-5.6 Sol Max still leads at 73%.

The pattern is consistent: agentic and terminal-based tasks show the biggest gains, while repo-scale coding benchmarks still favor GPT-5.6 Sol. That matches SpaceXAI's stated focus for the release — long-running agent workflows, not a general intelligence leap.

## Efficiency: the $0.84-per-task figure

Raw scores are only half the economics. Artificial Analysis measured Grok 4.6 finishing long agentic tasks in about 53 turns, against roughly 103 turns for Claude Opus 5, at a measured cost of $0.84 per task. Fewer turns means fewer tokens burned on retries and re-verification loops, which compounds with the lower per-token rate.

For teams running coding agents or automation pipelines at volume, cost-per-completed-task is a more honest metric than any benchmark score. A model that reaches the answer in half the steps can lose a benchmark point and still be the cheaper choice.

## Pricing — and the 200K-token billing trap

Standard pricing is $2 per million input tokens and $6 per million output tokens, with cached input at $0.50 per million. The trap: cross 200,000 prompt tokens and SpaceXAI re-bills the entire request at $4 per million input and $12 per million output — not just the overage. A 210,000-token request costs roughly double a 199,000-token one.

That makes the 500K context window expensive to actually fill. If your workload regularly passes 200K tokens, budget at the doubled rate or split requests. The cached-input rate of $0.50/M softens repeat calls over the same context, so cache aggressively when the API supports it.

## Where you can use Grok 4.6

Availability at launch: the xAI API, the Grok app and X, Cursor, and Grok Build — with double the included usage in Grok Build and Cursor for the first week. It is also served through third-party providers including OpenRouter, Vercel, and Cloudflare, and it went generally available on Amazon Bedrock on August 19, 2026 with four configurable reasoning effort levels — useful for enterprise teams that want a managed, audited deployment path.

Reasoning effort levels are low, medium, high, and the new xhigh. High is the default when the field is unset, and reasoning cannot be disabled. One caution from independent testing: a VulcanBench v3 sweep on real merged PRs found the effort curve is non-monotone — medium hit 87.0% pass@1 while the default high setting managed 73.9%, and xhigh recovered only to 78.3%. On that same suite, Grok 4.5 measured 91.3%. So on this one independent test the predecessor still wins, and the default setting is not the best one. Test effort levels on your own tasks rather than trusting the default.

## Should Grok 4.5 users upgrade?

The honest answer depends on what you run. Upgrade if your workloads are long-horizon agent tasks or terminal-based coding work — that is where the gains are largest (GDPval-AA and Terminal-Bench both show near-doubling). The five-point index jump is real and the price is unchanged from 4.5, so there is little cost downside.

Hold off if you depend on repo-scale coding benchmarks where GPT-5.6 Sol still leads, or if your prompts routinely exceed 200K tokens and the billing trap applies — in that case the effective price doubles and the value story weakens. And treat the vendor numbers as directional until independent evaluations broaden: composites and cherry-picked suites flatter every launch.

One more timing note: SpaceXAI moved fast after this release, shipping Grok 4.7 weeks later in September 2026. Check whether you actually need 4.6 or should evaluate the newer release before migrating anything in production.

## Key takeaways

- Grok 4.6 launched August 12, 2026 as a post-training upgrade of Grok 4.5, focused on long-running agent work — not a new base model.
- It scores 61 on the Artificial Analysis Intelligence Index, tied with GPT-5.6 Sol and five points above Grok 4.5.
- Biggest gains are in agentic benchmarks: GDPval-AA v2 up to 1753 Elo and Terminal-Bench v3.0 nearly doubled to 26%.
- Pricing is $2/$6 per million tokens — but requests over 200K prompt tokens re-bill the entire request at $4/$12.
- Artificial Analysis measures $0.84 per completed agentic task, with ~53 turns per task vs ~103 for Claude Opus 5.
- Independent testing shows the reasoning-effort curve is non-monotone: test medium vs high yourself instead of trusting the default.
`,
};
