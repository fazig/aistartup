import { BlogPost } from "../posts";
export const postWhatIsMcpServerHowToSetUp: BlogPost = {
  slug: "what-is-mcp-server-how-to-set-up",
  title: "What Is an MCP Server and How to Set One Up (2026 Guide)",
  description: "An MCP server gives AI assistants tools, data and prompts. Learn what the Model Context Protocol is and how to build a working server in TypeScript.",
  date: "September 24, 2026",
  readTime: "7 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/what-is-mcp-server-how-to-set-up_cover.webp",
  content: `![What Is an MCP Server and How to Set One Up (2026 Guide)](/what-is-mcp-server-how-to-set-up_cover.webp)

The Model Context Protocol has quietly become the standard way to plug external tools and data into AI assistants. An MCP server is the piece you build: a small program that exposes capabilities — like searching your database or calling an API — to clients such as Claude Desktop, Cursor, or VS Code. This guide explains what an MCP server is and walks you through setting up a real one with the official TypeScript SDK.

## What is an MCP server, exactly?

Think of an MCP server as an adapter. AI assistants are powerful but cut off from your world: they cannot see your files, your databases, or your internal APIs. The Model Context Protocol (MCP), introduced by Anthropic in late 2024 and donated to open governance, defines a standard client-server protocol for bridging that gap.

An MCP server speaks this protocol on the server side. It advertises three kinds of capabilities:

- **Tools** — actions the AI can execute: \`create_issue\`, \`send_email\`, \`search_database\`.
- **Resources** — read-only data the AI can pull in: file contents, database rows, document collections.
- **Prompts** — reusable prompt templates, like a "code review" workflow the assistant can invoke.

Clients connect to servers, discover what they offer, and let the model decide when to use them. The practical payoff is build-once, use-everywhere: a single server works with Claude Desktop, Claude Code, Cursor, Continue, and any future MCP-compatible client. Thousands of community servers now exist — for GitHub, Postgres, Slack, the browser, and more — so before building your own, check whether someone already maintains what you need.

## Transports: stdio vs HTTP

MCP servers talk to clients over two transports:

- **stdio** — the server runs as a local child process and communicates over standard input/output. This is the default for local servers: no ports, no networking, and the lowest overhead. Claude Desktop, Cursor, and Cline all launch stdio servers themselves from a config file.
- **Streamable HTTP** — the server runs as an HTTP service for remote access. Use this when the server lives on a different machine or you want to share one server across many clients.

For your first server, stdio is the path of least resistance, and that is what this guide uses.

## Set up a minimal MCP server

You need Node.js 18 or higher installed. The walkthrough below uses the official TypeScript SDK. Note that the SDK split into two packages in its v2 line: \`@modelcontextprotocol/server\` (core server) plus adapters such as \`@modelcontextprotocol/express\` for HTTP. Tutorials using \`server.tool()\` show the older v1 syntax, while newer ones use \`server.registerTool()\` — the concepts are identical, only the registration call differs.

### 1. Scaffold the project

\`\`\`bash
mkdir my-mcp-server && cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/server zod
npm install -D typescript @types/node
npx tsc --init
\`\`\`

The two runtime dependencies are the official MCP SDK and Zod, which handles input validation. Set your \`tsconfig.json\` to target ES2022 with Node module resolution and an \`outDir\` of \`./build\`.

### 2. Register your first tool

Create \`src/index.ts\`. Here is a small server exposing one tool, using the current v2 API:

\`\`\`ts
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "my-first-server", version: "1.0.0" });

server.registerTool(
  "add",
  {
    description: "Add two numbers together",
    inputSchema: {
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    },
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

The pattern is always the same: give the tool a name, describe its inputs with a Zod schema (the SDK converts this to JSON Schema for the protocol and validates incoming calls against it), and return content blocks from an async handler.

### 3. Build and run

\`\`\`bash
npx tsc
node build/index.js
\`\`\`

Congratulations — that is a working MCP server. One rule matters more than any other with stdio servers: **stdout is reserved for protocol messages**. Never use \`console.log\` in a stdio server; a stray log line corrupts the message stream. Log to stderr instead with \`console.error\`.

## Test it with the MCP Inspector

Before wiring the server into a client, test it with the official debugging tool, MCP Inspector. It launches your server as a subprocess and opens a web UI (usually at \`http://localhost:5173\`) where you can list tools, call them interactively, and inspect request/response shapes:

\`\`\`bash
npx @modelcontextprotocol/inspector node build/index.js
\`\`\`

Call your \`add\` tool with \`{"a": 2, "b": 3}\` and confirm you get back \`5\`. The Inspector is also the fastest way to diagnose schema problems: it shows exactly what the client sees.

## Connect it to Claude Desktop

Claude Desktop discovers stdio servers through a JSON config file:

- macOS: \`~/Library/Application Support/Claude/claude_desktop_config.json\`
- Windows: \`%APPDATA%\\Claude\\claude_desktop_config.json\`
- Linux: \`~/.config/Claude/claude_desktop_config.json\`

Add an entry under \`mcpServers\`:

\`\`\`json
{
  "mcpServers": {
    "my-first-server": {
      "command": "node",
      "args": ["/absolute/path/to/my-mcp-server/build/index.js"]
    }
  }
}
\`\`\`

Use the absolute path to your built file. Then fully quit and reopen Claude Desktop — your tool appears in Claude's tool list, and you can ask it to do arithmetic. For Claude Code, the equivalent one-liner is \`claude mcp add my-first-server -- node /absolute/path/to/build/index.js\`. Need secrets like API keys? Pass them through the config's \`env\` field instead of hardcoding them.

## Going further: resources and prompts

Tools get most of the attention, but servers get genuinely useful when you add the other two capabilities. A **resource** exposes read-only data at a URI — for example, \`todo://all\` returning your task list as JSON — which the client can pull into context. A **prompt** registers a reusable template, like "summarize my open tasks and suggest a priority order," that the user can trigger by name.

A practical rule of thumb from server authors: keep a server focused. Three to ten tools per server is the sweet spot — too many tools in one server reduces the model's accuracy when choosing between them. Group related tools in one server and split unrelated domains into separate servers.

Common next steps once your local server works: wrap it for Streamable HTTP so teammates can use it remotely (the \`@modelcontextprotocol/express\` and \`@modelcontextprotocol/node\` packages wire MCP into an Express app), then publish it to npm so others can run it with \`npx\`.

## Key takeaways

- An MCP server exposes tools, resources, and prompts to AI assistants over the open Model Context Protocol.
- Build one with the official TypeScript SDK (\`@modelcontextprotocol/server\` in v2), Zod for input schemas, and the stdio transport for local use.
- Always log to stderr in stdio servers — \`console.log\` on stdout breaks the protocol stream.
- Debug with MCP Inspector before connecting the server to Claude Desktop via \`claude_desktop_config.json\`.
- Keep servers focused (3–10 tools), then graduate to Streamable HTTP when you need remote or shared access.`,
};
