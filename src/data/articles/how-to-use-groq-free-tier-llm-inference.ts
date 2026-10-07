import { BlogPost } from "../posts";
export const postHowToUseGroqFreeTierLlmInference: BlogPost = {
  slug: "how-to-use-groq-free-tier-llm-inference",
  title: "Groq Free Tier for LLM Inference: 2026 Setup Guide",
  description: "Groq's free tier gives developers fast LLM inference with no credit card. Learn how to get an API key, pick models, and avoid rate limits.",
  date: "October 7, 2026",
  readTime: "6 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/how-to-use-groq-free-tier-llm-inference_cover.webp",
  content: `![Groq Free Tier for LLM Inference: 2026 Setup Guide](/how-to-use-groq-free-tier-llm-inference_cover.webp)

Groq runs large language models on its own LPU inference chips, and the results are startling: responses stream back in fractions of a second. Best of all for builders, Groq's developer tier is free, requires no credit card, and stays free indefinitely — it is rate-limited, not time-limited. This guide walks you through getting an API key, making your first call, and choosing the right model for your quota.

## 1. Create an account and generate an API key

1. Go to [console.groq.com](https://console.groq.com) and sign up with an email or social login.
2. Open the **API Keys** page (console.groq.com/keys).
3. Click **Create API Key**, give it a name like "my-app", and copy it immediately — you will not be able to see it again. Groq keys start with \`gsk_\`.

No credit card is requested at any point. The free plan is an "always free with limits" tier, designed for personal and non-commercial projects.

## 2. Make your first API call

Groq exposes an OpenAI-compatible endpoint, so if you have used the OpenAI API, everything feels familiar. The base URL is \`https://api.groq.com/openai/v1\`. Test your key with curl:

curl https://api.groq.com/openai/v1/chat/completions \\
  -H "Authorization: Bearer $GROQ_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-3.1-8b-instant",
    "messages": [{"role": "user", "content": "Explain rate limiting in one sentence."}]
  }'

A successful response returns the usual OpenAI-shaped JSON with \`choices[0].message.content\`. If you already have code written against the OpenAI SDK, you only need to change the base URL and drop in your Groq key:

from openai import OpenAI

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key="gsk_your_key_here",
)

resp = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[{"role": "user", "content": "Hello, Groq!"}],
)
print(resp.choices[0].message.content)

This portability is one of Groq's biggest practical advantages: switch providers with an environment change, not a code change.

## 3. Pick the right model for your quota

Free-tier limits are per model, and there are four ceilings that race each other: requests per minute (RPM), requests per day (RPD), tokens per minute (TPM), and tokens per day (TPD). Whichever you hit first throttles you with an HTTP 429.

Here are representative free-tier limits (check console.groq.com/settings/limits for your account's exact numbers, as they can change):

- **llama-3.1-8b-instant** — 30 RPM, 14,400 RPD, 6K TPM, 500K TPD. The fastest, most generous option. Ideal for chatbots, autocomplete, and classification at scale.
- **llama-3.3-70b-versatile** — 30 RPM, 1,000 RPD, 12K TPM, 100K TPD. Groq's general-purpose workhorse with tool calling and parallel calls. Better answers, much tighter daily budget.
- **openai/gpt-oss-120b and gpt-oss-20b** — 30 RPM, 1,000 RPD, 8K TPM, 200K TPD. Reasoning-capable models (use \`reasoning_format\` and \`reasoning_effort\` parameters). Good for harder problems where you need chain-of-thought.
- **whisper-large-v3 / whisper-large-v3-turbo** — 20 RPM, 2,000 RPD, 28,800 audio-seconds per day. That is 8 hours of free transcription every day — plenty for most side projects.

The key insight: for chat workloads, the daily token cap binds long before the request cap does. The 8B model's "14,400 requests a day" sounds infinite, but 500K tokens per day divided by 14,400 requests is only about 35 tokens per request — no real chat exchange is that small. At a realistic 1,000 tokens per exchange, the 8B gives you roughly 500 exchanges per day and the 70B roughly 100. Budget in tokens, not requests.

Also note that TPM is the burst ceiling: on the 70B, a single 10K-token document consumes nearly a full minute of your 12K TPM budget. Free tiers are shaped for many small requests, not a few enormous ones.

## 4. Avoid 429s with quota-friendly habits

A few habits keep you comfortably inside the free tier:

- **Route by difficulty.** Send easy traffic (classification, short chat, extraction) to llama-3.1-8b-instant and reserve the 70B or GPT-OSS models for questions that actually need them.
- **Keep requests small.** Cap chat history, trim tool definitions, and limit \`max_tokens\` on outputs. Every token you do not send is quota you keep.
- **Cache aggressively.** If requests repeat similar prompts, Groq can serve cached input tokens without counting them against your cap — so repeated or template-based traffic stretches further.
- **Back off on 429s.** When you hit a limit, wait and retry with exponential backoff instead of hammering. Limits reset on rolling minute and daily UTC windows.
- **Watch the supported-parameter list.** Groq rejects some OpenAI parameters (\`logprobs\`, \`logit_bias\`, \`messages[].name\`) and only supports one completion per request (\`n\` must be 1). Clean these out of ported code before debugging quota issues.

## 5. Beyond chat: transcription and agentic models

Groq is not just a chat endpoint. Whisper models make it a strong free speech-to-text option, and the \`groq/compound\` family offers an agentic system with server-side tools (note its free tier is restricted to 250 requests per day). Check the model catalog at console.groq.com/docs/models before committing to a model, since Groq regularly adds new ones and deprecates old ones — several older Llama 2, Mixtral, and Gemma variants were removed in early 2026.

## 6. Know when to upgrade

The free tier covers prototypes, bots, and moderate side projects. If you are consistently hitting the daily token ceiling, Groq's Developer tier is pay-as-you-go with roughly 10x higher rate limits, starting around $0.05 per million input tokens on the 8B model. You can also chain multiple free providers as fallbacks: many developers pair Groq with Google AI Studio (Gemini free tier) or Cerebras so a 429 from one provider falls through to the next instead of failing the user.

## Key takeaways
- Sign up at console.groq.com/keys, create a key (starts with \`gsk_\`), and use it with the OpenAI-compatible base URL \`https://api.groq.com/openai/v1\` — no credit card required.
- Existing OpenAI SDK code works by changing only the base URL and API key.
- Limits are per model across four dimensions (RPM, RPD, TPM, TPD); budget in tokens, not requests, since the daily token cap binds first for real chat workloads.
- The 8B Instant model offers the most generous free quota; the 70B and GPT-OSS models are for harder tasks with tighter budgets; Whisper gives you 8 hours of daily transcription free.
- See your exact limits at console.groq.com/settings/limits, cache repeated traffic, and back off on 429s.`,
};