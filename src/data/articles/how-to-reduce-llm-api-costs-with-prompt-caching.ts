import { BlogPost } from "../posts";
export const postHowToReduceLlmApiCostsWithPromptCaching: BlogPost = {
  slug: "how-to-reduce-llm-api-costs-with-prompt-caching",
  title: "How to Reduce LLM API Costs With Prompt Caching (2026)",
  description: "Cut LLM API costs with prompt caching: OpenAI's automatic caching, Anthropic cache_control, Gemini's implicit cache and semantic caching — pricing compared.",
  date: "September 25, 2026",
  readTime: "7 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/how-to-reduce-llm-api-costs-with-prompt-caching_cover.webp",
  content: `![How to Reduce LLM API Costs With Prompt Caching (2026)](/how-to-reduce-llm-api-costs-with-prompt-caching_cover.webp)

Your system prompt gets billed on every single request. A 1,500-token system prompt sent a hundred thousand times a day costs thousands of dollars a month for text that never changes. Prompt caching fixes exactly that: providers skip reprocessing the repeated prefix and charge you a fraction of the normal price. Here is how to set it up on each major provider.

## Why your LLM bill is bigger than it should be

Three things quietly inflate every API bill. First, the system prompt — identical on every call, billed in full every time. Second, retrieved documents: RAG pipelines send the same chunks to the model for users asking similar questions. Third, agents: coding and support agents resend conversation history, tool definitions, and instructions on every turn. In many production apps, 40–60% of requests are near-duplicates of something the model already processed.

Provider-side prompt caching discounts the cached prefix. OpenAI does it automatically; Anthropic and Google give you explicit controls with bigger discounts. A semantic cache layer in front of your API calls catches the rest.

## 1. OpenAI: do nothing, get 50% off cached prefixes

OpenAI's approach is the simplest. Caching activates automatically for prompts of 1,024 tokens or more — no markers, no configuration. When a request shares a prefix with a recent request on the same model, the cached portion is billed at a 50% discount on most models. On cache misses you pay the normal rate, so there is no downside to it being on.

To confirm it is working, inspect the usage object in your API response. Look for the cached_tokens field:

\`\`\`python
response = client.responses.create(model="gpt-4.1", input=messages)
usage = response.usage
print(usage.input_tokens, usage.input_tokens_details.cached_tokens)
\`\`\`

If cached_tokens stays at zero, your prefix is shorter than 1,024 tokens or it changes between requests. The fix is structural (see step 5), not a setting.

## 2. Anthropic: cache_control breakpoints for a 90% discount

Anthropic gives you explicit control and the biggest discount of the three providers: 90% off the cached portion. You mark stable content blocks with cache_control. The first request pays a 25% write premium on those blocks; every subsequent hit within the 5-minute TTL gets the 90% read discount. There is also an optional 1-hour TTL that doubles the write premium.

\`\`\`python
messages = [
    {"role": "system", "content": [
        {"type": "text", "text": SYSTEM_PROMPT,
         "cache_control": {"type": "ephemeral"}},
        {"type": "text", "text": tool_definitions_json,
         "cache_control": {"type": "ephemeral"}},
    ]},
    {"role": "user", "content": user_query},
]
\`\`\`

The rules to remember: breakpoints are positional, so put the cacheable content first and the changing content (user query, fresh RAG results, conversation tail) after it. You get a maximum of four breakpoints per request. Minimum prefix sizes vary by model — roughly 1,024 tokens for Sonnet and Opus, 2,048 for older Haiku generations. One well-placed breakpoint near the end of your static content usually suffices, since Anthropic checks the blocks before it automatically.

When does the 1-hour TTL pay off? Do the math: with a 100% write premium instead of 25%, you need more repeat hits per hour to break even. It suits agents that hammer the same instructions all day, not chatbots with sporadic traffic.

## 3. Gemini: implicit caching or the explicit CachedContent API

Google offers two modes. Implicit caching works like OpenAI's: on Gemini 2.5 models it kicks in automatically with zero code changes and gives roughly a 75% discount on cached prefixes. The explicit CachedContent API lets you create a named cache with a configurable TTL for up to a 90% discount — but you also pay a small hourly storage fee for holding the cache, so idle caches cost you money.

The minimum thresholds were lowered in 2026: about 1,024 tokens for Gemini 2.5 Flash and 2,048 for Gemini 2.5 Pro. Explicit caches make sense when you have a large, stable prefix (say, 100k tokens of reference docs) queried several times per hour; below a few queries per hour, the storage fee means no cache wins on cost.

## 4. Don't overlook the automatic caches

Some providers and models cache with no configuration at all. DeepSeek, for example, caches prefixes automatically in 64-token chunks — cache hits cost roughly a tenth of misses, with no minimum threshold and no write premium. If you serve high-volume traffic on a budget model, simply routing to one with aggressive automatic caching can cut input costs dramatically without touching your code.

## 5. Structure prompts so caches actually hit

This is the step most teams skip, and it is where most caching silently fails. Caching matches on the exact prefix, so any change early in the prompt invalidates everything after it.

- **Put static content first.** System prompt, tool definitions, brand instructions, reference documents — all before the user query and conversation history.
- **Never shuffle.** A tools array in a different order, RAG documents sorted differently, a timestamp injected near the top — any of these breaks the prefix match and silently degrades to full price. Canonicalize ordering before sending.
- **Hoist timestamps and IDs to the end.** Per-request metadata belongs after the cached region, never inside it.
- **Reuse one session per workflow where possible.** Prompt caches are keyed per model and region; spreading identical prompts across regions multiplies your cold misses.
- **Watch tool definitions in agents.** Agent frameworks that regenerate or reorder tool schemas between turns will torpedo your hit rate. Pin the schema and send the identical JSON every turn.

After restructuring, watch your cached_tokens (OpenAI) or the cache_read_input_tokens in Anthropic's usage object for a week. Production systems commonly reach 60–80% hit rates on the stable prefix.

## 6. Add a semantic cache for near-duplicate queries

Provider caching only catches exact prefix matches. Users ask the same question in different words — "what is your return policy?" versus "how do I return something?" — and each phrasing triggers a full-price call. A semantic cache sits in front of your API calls, embeds each incoming query, and serves the stored answer when the meaning matches a previous one. A hit costs zero tokens.

Open-source options include GPTCache (by Zilliz, pip-installable, integrates with LangChain) and AI gateway projects like Bifrost that ship semantic caching as middleware. Production reports show hit rates of 30–60% on this layer alone, which stacks on top of provider prefix caching.

One caution from recent experiments: threshold tuning matters. A cosine similarity threshold around 0.92 works well in production write-ups; thresholds set too low (0.80 and below) start serving wrong answers to subtly different questions — restart versus reload, staging versus production credentials. Tune the threshold on your own near-miss queries, and only apply semantic caching to endpoints where a slightly off answer is acceptable (FAQs, docs Q&A). For anything factual or financial, keep the threshold high or skip this layer.

## 7. Measure, then optimize

Attach dollar savings to every call. Every provider returns usage data that distinguishes cached from fresh tokens — use it. A minimal weekly dashboard: total input tokens, cached input tokens, hit rate, and estimated spend with and without caching. One documented Anthropic example: a 2,000-token system prompt at 100,000 requests per day saves over $400 per day on cache hits. Combined strategies (semantic cache + provider prefix caching) routinely cut total LLM spend by more than half, with some teams reporting 60–73% reductions.

## Key takeaways

- OpenAI caches prompts of 1,024+ tokens automatically at a 50% discount — verify with the cached_tokens field.
- Anthropic's cache_control breakpoints give a 90% read discount with a 25% write premium and a 5-minute TTL; keep breakpoints positional with static content first.
- Gemini offers free implicit caching (~75% off) plus an explicit CachedContent API (up to 90% off) that charges a small hourly storage fee — explicit caches lose below a few queries per hour.
- Structure matters more than settings: stable prefix order, static content first, and identical tool definitions are what make caches hit.
- A semantic cache layer (GPTCache, Bifrost) catches differently-worded duplicates; keep similarity thresholds high to avoid wrong answers.
`,
};
