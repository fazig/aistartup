import { BlogPost } from "../posts";
export const postHowToSwitchOpenrouterVercelAiGateway: BlogPost = {
  slug: "how-to-switch-openrouter-vercel-ai-gateway",
  title: "How to Switch From OpenRouter to Vercel AI Gateway Free",
  description: "Switch from OpenRouter to Vercel AI Gateway free: swap the base URL, update your model names, and reuse your OpenAI-compatible code with $5 of monthly gateway credits.",
  date: "October 7, 2026",
  readTime: "6 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/how-to-switch-openrouter-vercel-ai-gateway_cover.webp",
  content: `![How to Switch From OpenRouter to Vercel AI Gateway Free](/how-to-switch-openrouter-vercel-ai-gateway_cover.webp)

OpenRouter and Vercel AI Gateway do the same job: one API key, one OpenAI-compatible endpoint, hundreds of models. If your app already talks to OpenRouter, switching to Vercel AI Gateway is mostly a three-line change — a new base URL, a new key, and model-name cleanup. This guide walks through the migration, the free tier on both sides, and the gotchas that actually break apps mid-switch.

## Why switch at all

Both gateways pass provider prices through with zero markup, so the decision comes down to your setup, not per-token cost.

**Reasons people switch to Vercel AI Gateway:**
- **Native Vercel integration.** If your app runs on Vercel, OIDC authentication means no API key in environment variables — the platform mints a short-lived token for you.
- **Built-in observability.** Every request shows up in the Vercel dashboard with per-model cost, latency, and usage breakdowns.
- **Gateway-level zero data retention by default.** Prompts are not stored at the gateway layer unless you opt into custom reporting.
- **$5 of free credits every 30 days** on a subset of models, no card required to start experimenting.

**Reasons to stay on OpenRouter:** a larger free-model catalog with \`:free\` variants that need no credits at all, standalone account (no Vercel team required), and the provider uptime filtering you may already rely on.

You can also run both — many teams use Vercel AI Gateway for production apps and OpenRouter free variants for local experimentation.

## What stays the same

Both endpoints speak the OpenAI Chat Completions API. Your request and response shapes do not change. This minimal Python client works against either one:

\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",  # swap this line
    api_key="sk-or-...",                       # and this one
)

resp = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "Explain idempotency in two sentences."}],
)
print(resp.choices[0].message.content)
\`\`\`

That is the whole migration in principle: change the base URL, change the key. Everything below is the detail that makes it work without surprises.

## Step 1: Get an AI Gateway API key

1. Log in to vercel.com and open the AI Gateway section of your dashboard.
2. Create a new API key under AI Gateway → Keys. Keys are scoped to your team.
3. Store it as an environment variable, for example \`AI_GATEWAY_API_KEY\`. Treat it like any secret — never commit it to a repo.

If your app runs on Vercel, you can skip the key entirely. The platform can authenticate gateway requests with OIDC: link the project (\`vercel link\`), pull environment variables (\`vercel env pull\`), and the gateway accepts the deployment's OIDC token. This removes a long-lived secret from your configuration, which is the safest option for production workloads.

## Step 2: Swap the base URL

Replace the OpenRouter base URL with the AI Gateway endpoint:

| Gateway | Base URL |
|---|---|
| OpenRouter | \`https://openrouter.ai/api/v1\` |
| Vercel AI Gateway | \`https://ai-gateway.vercel.sh/v1\` |

In code:

\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://ai-gateway.vercel.sh/v1",
    api_key="YOUR_AI_GATEWAY_KEY",
)
\`\`\`

Environment-based configuration keeps this clean:

\`\`\`bash
# .env
LLM_BASE_URL=https://ai-gateway.vercel.sh/v1
LLM_API_KEY=vck_...
\`\`\`

One behavioral note: some HTTP clients cache the resolved URL or connection pool per host. If you hot-swap the base URL in a long-running process, restart the process or clear pooled connections — stale connections against the old host produce confusing authentication errors.

## Step 3: Fix model names

This is where most migrations fail. OpenRouter and Vercel use slightly different model naming:

- **OpenRouter** lets you pin variants and free tiers with suffixes: \`deepseek/deepseek-chat:free\`, \`meta-llama/llama-3.1-8b-instruct:free\`, \`anthropic/claude-3.5-sonnet:beta\`.
- **Vercel AI Gateway** uses plain \`provider/model\` names with no suffix: \`deepseek/deepseek-chat\`, \`meta/llama-3.1-8b-instruct\`, \`anthropic/claude-3.5-sonnet\`.

Migration rule: strip any \`:free\`, \`:beta\`, or other suffix after the model name. The gateway then resolves the base model, and whether it counts against your $5 free credits or paid balance depends on your billing state, not on a suffix.

Common replacements:

| OpenRouter | Vercel AI Gateway |
|---|---|
| \`openai/gpt-4o\` | \`openai/gpt-4o\` |
| \`anthropic/claude-3.5-sonnet\` | \`anthropic/claude-3.5-sonnet\` |
| \`deepseek/deepseek-chat:free\` | \`deepseek/deepseek-chat\` |
| \`google/gemini-2.0-flash-001\` | \`google/gemini-2.0-flash\` |
| \`meta-llama/llama-3.1-8b-instruct:free\` | \`meta/llama-3.1-8b-instruct\` |

If your code builds model names from a config file or database, do a project-wide search for \`:free\` — every one of those strings is a request that will fail against the new endpoint.

## Step 4: Migrate provider-specific extras

**Request headers.** OpenRouter encourages \`HTTP-Referer\` and \`X-Title\` headers for app attribution on its leaderboards. Vercel AI Gateway does not need them — requests are attributed to your project automatically, and usage appears per app in the dashboard. You can delete those headers; harmless to leave them, but they serve no purpose now.

**Structured output.** Both gateways forward provider-native structured output, but the support matrix differs per model. If you use OpenRouter's provider-routing JSON mode workarounds, test each model on the new gateway before deploying — run your hardest schema first.

**Streaming.** Both endpoints stream in the standard SSE format. No change needed: \`stream=True\` in Python or \`streamText\` in the Vercel AI SDK keeps working.

**Fallbacks.** If you used OpenRouter's automatic provider fallbacks, reimplement them on the AI Gateway side with configurable model fallbacks — a comma-separated list of fallback models that the gateway tries in order when the primary fails. Configure at least one fallback for production traffic.

**BYOK.** Both support bringing your own provider keys with no gateway fee. On Vercel, attach your own provider key in the dashboard and the gateway routes through it; useful if you already hold direct Anthropic or OpenAI contracts with negotiated pricing.

## Step 5: Compare the free tiers honestly

This is the part people get wrong:

- **OpenRouter:** many models have \`:free\` variants with daily request caps and no card required. The free catalog is broad but rate-limited and subject to change.
- **Vercel AI Gateway:** every team gets **$5 of credits every 30 days** (starts on your first request) usable on a **subset of models**. There is no card needed to start, and beyond the free credits you pay provider list price with no markup — card top-ups pass through processing fees.

Practical takeaway: if your workload is small experiments and side projects, $5 of monthly credits on efficient models like \`deepseek/deepseek-chat\` or \`google/gemini-2.0-flash\` goes a long way. If you specifically want uncapped experimentation on flagship models for free, OpenRouter's \`:free\` variants still win — which is why many developers keep both.

## Step 6: Test before you cut over

Run both gateways in parallel for a day:

1. **Shadow traffic:** send a copy of production prompts to the new endpoint and log status codes, latency, and first-token time. Watch for model-name 404s (suffix leftovers) and 401s (wrong key variable).
2. **Cost check:** compare the gateway dashboard's reported cost against what OpenRouter charged for the same volume. Both claim zero markup; verify with your own numbers.
3. **Rate limits:** the AI Gateway applies its own rate-limit tiers. If you previously relied on OpenRouter absorbing bursts, confirm the new tier handles your peaks — configure auto top-up so a credits-balance dip never takes your app down.
4. **Switch over:** flip the \`LLM_BASE_URL\` / \`LLM_API_KEY\` values in your deployment environment, then keep the OpenRouter key active for a week as an instant rollback.

## Common migration errors

- **401 Unauthorized right after switching:** you kept \`sk-or-...\` as the key, or you are reading the old env var name. Verify which variable your client actually loads.
- **404 on a model that "definitely exists":** a \`:free\` or \`:beta\` suffix survived the rename. Strip everything after the base model name.
- **Response format changed slightly:** some models return different stop-reason strings or tool-call shapes through different gateways. If you parse responses strictly, loosen parsing to the standard OpenAI shape.
- **Embedding calls failing:** both gateways focus on chat and completion models. For embeddings, many teams keep a direct provider SDK — the AI Gateway docs themselves recommend a direct provider SDK for embeddings.

## Key takeaways

- The core migration is two lines: base URL to \`https://ai-gateway.vercel.sh/v1\` and a new API key.
- Strip OpenRouter suffixes like \`:free\` and \`:beta\` from every model name — that is the number-one cause of broken requests after switching.
- Vercel's free tier is $5 of credits every 30 days on a subset of models, with zero markup beyond provider list price.
- If your app runs on Vercel, use OIDC authentication and skip the API key entirely.
- Shadow production traffic for a day, keep the OpenRouter key as a rollback, and verify costs yourself before committing.`,
};
