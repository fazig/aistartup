import { BlogPost } from "../posts";
export const postHowToConnectClaudeToGoogleDriveWithMcp: BlogPost = {
  slug: "how-to-connect-claude-to-google-drive-with-mcp",
  title: "How to Connect Claude to Google Drive With MCP (2026)",
  description: "Learn how to connect Claude to Google Drive with MCP: set up Google Cloud OAuth, install a Drive MCP server, and configure Claude Desktop for full file access.",
  date: "September 24, 2026",
  readTime: "7 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/how-to-connect-claude-to-google-drive-with-mcp_cover.webp",
  content: `![How to Connect Claude to Google Drive With MCP (2026)](/how-to-connect-claude-to-google-drive-with-mcp_cover.webp)

Claude is a sharp reader and writer, but out of the box it cannot see your Google Drive. With an MCP (Model Context Protocol) server sitting between the two, Claude Desktop can list, search, read, and even create files in your Drive directly from chat. This guide walks you through the full setup: a Google Cloud OAuth client, a Drive MCP server, and the Claude Desktop config.

## What this setup gives you

Once connected, Claude can do things like: "Find the meeting notes from last week and summarise the action items," "Read this spreadsheet and chart the monthly totals," or "Create a new doc with the draft below and save it to my Drive." The MCP server translates Claude's requests into Google Drive API calls, so everything happens with your own credentials and stays in your account.

## What you need before you start

- **Claude Desktop** installed and signed in (the MCP connection is a desktop feature; claude.ai in the browser does not support MCP servers).
- **Node.js 18 or newer**, since most Drive MCP servers install and run through \`npx\` or \`node\`.
- A **Google account** with access to the Google Cloud Console. A free Cloud account works — the Drive API has a generous free quota.

## Step 1: Create a Google Cloud project and enable the Drive API

MCP servers talk to Google on your behalf, and Google requires every API client to be registered in a Cloud project:

1. Go to the Google Cloud Console and create a new project (or select an existing one).
2. Open the API library and enable the **Google Drive API**. If your MCP server also touches Docs, Sheets, Gmail, or Calendar, enable those APIs too — the all-rounder server described below needs Docs, Sheets, Drive, Gmail, and Calendar.
3. Open "APIs & Services" > "OAuth consent screen," choose **External**, and add your own email address as a test user. Apps in testing mode can only grant access to listed test users, which is fine for a personal setup.

## Step 2: Create an OAuth client ID

1. In the Cloud Console, go to "APIs & Services" > "Credentials" and click **Create Credentials > OAuth client ID**.
2. Set the application type to **Desktop app**.
3. Copy the **Client ID** and **Client Secret** from the confirmation screen and keep them somewhere safe — you will paste them into the MCP server config in a later step.

## Step 3: Pick a Google Drive MCP server

Several open-source servers do this job. Choose based on how much of Google Workspace you want Claude to reach:

- **@a-bonus/google-docs-mcp** — the popular all-rounder. One server covers Docs, Sheets, Drive, Gmail, and Calendar with a single \`auth\` command that opens your browser and saves the refresh token to \`~/.config/google-docs-mcp/token.json\`. Installs straight from npm: \`npx -y @a-bonus/google-docs-mcp auth\`.
- **rofe/mcp-gdrive** — a focused Drive-only server with list, search, read, write, create, and upload tools. After \`npm install\`, run \`npm run auth\`; tokens are saved to a git-ignored \`.gdrive-token.json\` in the project folder.
- **starfysh-tech/gdrive-mcp** — good if you manage a Workspace organisation, because it supports service accounts and domain-wide delegation in addition to normal OAuth.
- **lslv1243/mcp-gdrive** — the simplest auth story if you already use Google Cloud tooling: it uses \`gcloud auth application-default login\` with the Drive scopes, so no OAuth client ID is needed at all.

For most readers, the all-rounder \`@a-bonus/google-docs-mcp\` is the fastest path: one package, one auth step, and Drive plus Docs and Sheets access in a single entry.

## Step 4: Authorise the server with Google

Each server has its own auth command; the pattern is the same: you pass your client ID and secret, the browser opens, you sign in and approve the requested scopes, and a refresh token is stored locally.

With the all-rounder server it looks like this:

\`\`\`bash
GOOGLE_CLIENT_ID="your-client-id" \
GOOGLE_CLIENT_SECRET="your-client-secret" \
npx -y @a-bonus/google-docs-mcp auth
\`\`\`

Approve the scopes in the browser. When the flow finishes, the token is saved to \`~/.config/google-docs-mcp/token.json\`. The server will silently refresh this token on later launches, so you only authorise once.

## Step 5: Add the server to Claude Desktop's config

Claude Desktop discovers MCP servers from a JSON config file. The file lives at:

- **macOS:** \`~/Library/Application Support/Claude/claude_desktop_config.json\`
- **Windows:** \`%APPDATA%\\Claude\\claude_desktop_config.json\`
- **Linux:** \`~/.config/Claude/claude_desktop_config.json\`

Create the file if it does not exist, then add an entry for your server. For the all-rounder:

\`\`\`json
{
  "mcpServers": {
    "google-docs": {
      "command": "npx",
      "args": ["-y", "@a-bonus/google-docs-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
\`\`\`

If you chose the Drive-only server that runs from a local checkout, the entry points at your file instead:

\`\`\`json
{
  "mcpServers": {
    "gdrive": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-gdrive/src/index.js"]
    }
  }
}
\`\`\`

Use an absolute path in \`args\` — relative paths break when Claude Desktop launches the server from a different working directory.

## Step 6: Restart Claude Desktop and verify

Quit Claude Desktop completely and open it again. Click the tools/attachment icon in the chat input (or open Settings > Developer): you should see your new server listed with its tools. Then test it with a harmless query first, for example:

> "Search my Google Drive for the file called 'budget' and list the top 5 matches."

If Claude returns real file names from your Drive, the connection works. Next, try something with teeth: "Read the 'Project plan' doc and summarise the three most urgent tasks," or "Create a new Google Sheet called 'Expense test' with headers Date, Item, Amount."

## Troubleshooting the usual snags

**"Google hasn't verified this app" warning.** Expected — your OAuth client is your own project in testing mode. Click "Advanced" and "Go to <your project name> (unsafe)" to continue; it is only unsafe because Google has not reviewed your own app. It will not appear once you stay within your own account.

**Error 403: access_denied during auth.** Your Google account is not listed as a test user on the OAuth consent screen. Go back to the consent screen settings in the Cloud Console and add the exact email address you are signing in with.

**The server does not appear in Claude Desktop.** Almost always a config problem: invalid JSON (a missing comma is the classic), a relative path in \`args\`, or \`npx\` not being on the system PATH that Claude Desktop inherits. Validate the file with a JSON checker, use the full path to node if needed, and restart the app.

**Tools work once, then fail hours later.** The refresh token was not persisted or was revoked. Delete the saved token file and run the \`auth\` command again. Keep the consent screen in testing mode — publishing the app changes token behaviour.

## A note on permissions and safety

Granting Drive access gives Claude genuine read/write power over your files, so treat the scope deliberately. If you only want Claude to *read* — summarising documents, pulling spreadsheet data — pick a server configured with the read-only \`drive.readonly\` scope rather than full Drive access. Never commit your client secret or token files to a public repo (token files are git-ignored in the well-built servers for this reason). And for a shared or work Drive, prefer the service-account server option with a narrowly scoped service account instead of your personal OAuth token.

## Key takeaways

- Connecting Claude to Google Drive needs three pieces: a Google Cloud OAuth client, a Drive MCP server, and an entry in Claude Desktop's \`claude_desktop_config.json\`.
- Create the OAuth client as a Desktop app, enable the Drive API (plus Docs/Sheets APIs if you want them), and add your email as a test user on the consent screen.
- \`@a-bonus/google-docs-mcp\` is the quickest all-rounder (Drive, Docs, Sheets, Gmail, Calendar); \`rofe/mcp-gdrive\` is the lean Drive-only option; \`starfysh-tech/gdrive-mcp\` adds service-account support.
- Restart Claude Desktop after editing the config, then verify with a read-only query before asking Claude to create or modify files.
- Keep the scopes minimal for your use case, guard your tokens, and re-run the \`auth\` step if tokens expire or get revoked.
`,
};
