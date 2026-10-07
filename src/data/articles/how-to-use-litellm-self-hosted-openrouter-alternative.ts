import { BlogPost } from "../posts";
export const postHowToUseLitellmSelfHostedOpenrouterAlternative: BlogPost = {
  slug: "how-to-use-litellm-self-hosted-openrouter-alternative",
  title: "How to Use LiteLLM: Self-Hosted OpenRouter Alternative",
  description: "LiteLLM is a self-hosted OpenRouter alternative: one OpenAI-compatible gateway for 100+ LLM providers. Docker setup, YAML config, virtual keys, spend tracking.",
  date: "October 7, 2026",
  readTime: "7 min read",
  category: "Developer Tools",
  author: "Faizan Arif",
  image: "/how-to-use-litellm-self-hosted-openrouter-alternative_cover.webp",
  content: `![How to Use LiteLLM: Self-Hosted OpenRouter Alternative (2026)](/how-to-use-litellm-self-hosted-openrouter-alternative_cover.webp)

OpenRouter made it easy to call dozens of LLMs through one API — but it is still someone else's server. Your API keys leave your network, your usage data sits on a third-party dashboard, and you pay whatever margin the aggregator adds on top of provider pricing. LiteLLM flips that model: it is an open-source Python project that gives you your own OpenRouter-style gateway, running on your hardware, with one OpenAI-compatible endpoint that routes to 100+ LLM providers.

Here is how to install it, configure it, and decide whether it beats paying an aggregator.

## What LiteLLM actually does

LiteLLM has two parts. The first is a Python SDK (\`from litellm import completion\`) that normalizes calls across providers — you write OpenAI-style code and swap models with a prefix like \`anthropic/claude-sonnet-4-5\` or \`ollama/llama3.2:3b\`. The second, and the one this guide covers, is the LiteLLM Proxy: a self-hosted AI gateway server. It accepts OpenAI-compatible requests on port 4000 and forwards them to whichever provider your config maps them to.

The key promise: any client that works with OpenAI works with the proxy, no code changes needed. Point the OpenAI SDK, LangChain, Open WebUI, or any app at \`http://localhost:4000\` and it just works — whether the model behind it is GPT-4o, Claude, Gemini, or a Llama model running on your own Ollama box.

## LiteLLM vs OpenRouter: the honest comparison

OpenRouter is a hosted marketplace: one API key buys access to hundreds of models, with automatic failover and unified billing. LiteLLM is infrastructure you run yourself. That difference defines everything:

- **Cost.** OpenRouter charges provider prices plus its own fee. LiteLLM is free software; you pay providers directly, so the aggregator margin disappears. On a busy app that margin is not trivial.
- **Privacy.** With OpenRouter, prompts travel to their servers. With LiteLLM on your own VPS or on-prem box, requests only go from your gateway to the provider you chose — and you can route sensitive workloads entirely to local models.
- **Control.** LiteLLM gives you virtual API keys with per-key budgets, rate limits, model allow-lists, fallbacks, load balancing across deployments, and logging to 20+ backends. OpenRouter has dashboards too, but you cannot reshape them.
- **Maintenance.** This is OpenRouter's win. A hosted service never needs a Docker update, a Postgres backup, or a 3 AM restart. Self-hosting is real operational work.

If you call models from many services, teams, or users and want spend control without an aggregator tax, self-host. If you just want the cheapest way to test 50 models once, a hosted aggregator is simpler.

## Prerequisites

You need Docker and Docker Compose installed, plus API keys for whichever providers you want to route to (OpenAI, Anthropic, Gemini, and so on). For virtual keys, budgets, and logging — the features that make LiteLLM a real OpenRouter replacement — you also need a Postgres database, which you can run as another Docker container or use a managed service.

## Option 1: The 60-second quick start

For a personal experiment, the CLI is the fastest path:

\`\`\`bash
pip install 'litellm[proxy]'
litellm --model gpt-4o
# Proxy running on http://0.0.0.0:4000
\`\`\`

Then call it exactly like OpenAI:

\`\`\`python
import openai

client = openai.OpenAI(api_key="anything", base_url="http://0.0.0.0:4000")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Summarize this in one sentence"}]
)
print(response.choices[0].message.content)
\`\`\`

One command, one endpoint, multiple providers. But for anything durable you want the Docker setup with a config file.

## Option 2: Docker setup with a config file

Create a project folder and a \`litellm_config.yaml\`. This file is the heart of the gateway — it declares every model the proxy is allowed to serve:

\`\`\`yaml
model_list:
  - model_name: gpt-4o            # the name clients request
    litellm_params:
      model: openai/gpt-4o        # provider prefix + model id
      api_key: os.environ/OPENAI_API_KEY
  - model_name: claude-sonnet
    litellm_params:
      model: anthropic/claude-sonnet-4-5
      api_key: os.environ/ANTHROPIC_API_KEY
  - model_name: local-llama
    litellm_params:
      model: ollama/llama3.2:3b
      api_base: http://ollama:11434

general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
  database_url: os.environ/DATABASE_URL
\`\`\`

Note the \`os.environ/\` pattern: secrets stay in environment variables and never touch the config file. Generate the master key with \`openssl rand -hex 32\` — when it is set, every request to the proxy must carry it or a virtual key.

Now start it:

\`\`\`bash
docker run -v $(pwd)/litellm_config.yaml:/app/config.yaml \\
  -e LITELLM_MASTER_KEY=sk-your-master-key \\
  -e DATABASE_URL=postgresql://user:pass@host:5432/litellm \\
  -e OPENAI_API_KEY=sk-... \\
  -e ANTHROPIC_API_KEY=sk-ant-... \\
  -p 4000:4000 \\
  docker.litellm.ai/berriai/litellm:main-stable \\
  --config /app/config.yaml
\`\`\`

The \`main-stable\` tag is the production recommendation; \`main-latest\` is the nightly bleeding edge. Verify the gateway is alive with \`curl http://localhost:4000/health\` before wiring anything to it.

For a real deployment, put this in a \`docker-compose.yaml\` next to a \`postgres:16-alpine\` container, restart both with \`restart: unless-stopped\`, and expose only \`127.0.0.1:4000\` unless you have a reverse proxy with TLS in front. The proxy itself does not terminate TLS.

## Virtual keys: per-user access with budgets

This is the feature that turns a proxy into an OpenRouter replacement. With the database connected, you can mint keys that expire, are restricted to specific models, and carry hard spend caps:

\`\`\`bash
curl -X POST localhost:4000/key/generate \\
  -H "Authorization: Bearer $LITELLM_MASTER_KEY" \\
  -d '{"key_alias":"team-a","models":["gpt-4o","claude-sonnet"],
       "max_budget":10.0,"duration":"30d",
       "tpm_limit":100000,"rpm_limit":60}'
\`\`\`

Each generated key can be scoped to a model allow-list, a dollar budget, a time window, and token/request rate limits. Hand one to each app, teammate, or customer, and the gateway enforces the limits and logs every request to Postgres for spend tracking. There is also a built-in admin UI on the same port for managing keys visually.

## Fallbacks and load balancing

Production traffic hits rate limits. LiteLLM handles it at the router level. Add a \`router_settings\` section for latency-based routing across duplicate deployments, and define \`fallbacks\` so a 429 or 500 from one model automatically retries on another:

\`\`\`yaml
router_settings:
  routing_strategy: latency-based-routing

litellm_settings:
  drop_params: true
  request_timeout: 120
  fallbacks:
    - gpt-4o: [claude-sonnet]
\`\`\`

The model allow-list is a free security feature: if a model is not declared in \`model_list\`, the proxy rejects the request. That alone prevents a leaked key from being used to call arbitrary expensive models.

## Adding OpenRouter (or any OpenAI-compatible API) as a backend

Ironically, you can also plug OpenRouter into LiteLLM as just another provider — useful during migration or for models you do not hold direct keys for. Any OpenAI-compatible endpoint works with the \`openai/\` prefix and a custom \`api_base\`:

\`\`\`yaml
  - model_name: or-qwen
    litellm_params:
      model: openai/qwen/qwen3-32b
      api_base: https://openrouter.ai/api/v1
      api_key: os.environ/OPENROUTER_API_KEY
\`\`\`

Switching clients off OpenRouter entirely is a one-line change per app: replace \`base_url="https://openrouter.ai/api/v1"\` with your gateway address and swap the model name for your alias.

## When self-hosting is the wrong call

Be honest about the tradeoffs. If you make a few thousand requests a month, the aggregator margin is pennies and not worth maintaining a database, watching a container, and patching a proxy. If you need exotic models you cannot get direct API access to, OpenRouter's catalog wins. And if you have no appetite for uptime responsibility, a gateway going down takes every app behind it down too — hosted services absorb that for you.

The sweet spot for LiteLLM: teams and indie hackers with steady, significant LLM traffic who want one bill from providers, spend caps per project, and the option to route private data to local models without a third party in the loop.

## Key takeaways

- LiteLLM's proxy server is a free, self-hosted OpenAI-compatible gateway that routes to 100+ LLM providers from one endpoint on port 4000.
- Start with \`litellm --model gpt-4o\`; move to the Docker \`main-stable\` image with a \`litellm_config.yaml\` for anything durable.
- Keep secrets in environment variables via the \`os.environ/\` pattern and protect the gateway with a generated \`master_key\`.
- Virtual keys with budgets, rate limits, and expiry turn the proxy into a full OpenRouter replacement with per-team spend tracking.
- Latency-based routing, fallbacks, and the model allow-list give you production resilience without a hosted service — at the cost of operating it yourself.
`,
};
