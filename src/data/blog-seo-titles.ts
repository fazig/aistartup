export const BLOG_SEO_TITLES: Record<string, string> = {
  'best-free-ats-resume-builders-no-paywall': 'Best Free ATS Resume Builders in 2026 (No Paywall)',
  'how-to-create-and-validate-llms-txt': 'How to Create and Validate llms.txt (2026 Guide)',
  'generative-engine-optimization-geo-guide-2026': 'Generative Engine Optimization (GEO) Guide 2026',
  'best-free-grammarly-alternatives-2026': '5 Best Free Grammarly Alternatives in 2026',
  'best-free-remini-alternatives-2026': '5 Best Free Remini Alternatives in 2026 (No Ads)',
  'top-free-ai-presentation-makers-2026': 'Top Free AI Presentation Makers in 2026',
  'best-spinbot-alternatives-free': '5 Best Free Spinbot Alternatives in 2026',
  'micro-qr-codes-guide': 'Micro QR Codes: Complete Sizing & Printing Guide',
  'manus-ai-vs-google-antigravity': 'Manus AI vs Google Antigravity: 2026 Benchmark',
  'samsung-ai-vs-galaxy-ai-differences': 'Samsung AI vs Galaxy AI: Differences Explained',
  'claude-opus-5-vs-gpt-5': 'Claude Opus 5 vs GPT-5: The Frontier AI Battle',
  'grok-new-version-cursor-pro-magic': 'Grok in Cursor Pro: Real-Time Agentic IDE Guide',
  'using-manus-ai-free-till-25-august': 'How to Use Manus AI Free: General Agent Guide',
  'unlimited-ai-video-generation-manus-ai-till-25-august': 'Manus AI: Free Video Generation Guide (2026)',
  'manus-ai-vs-cursor-vs-grok-vs-codex-vs-antigravity': 'Manus AI vs Cursor vs Grok vs Antigravity (2026)',
  'deepseek-v4-vs-grok-45-vs-ollama-guide': 'DeepSeek V4 vs Grok 4.5 vs Ollama: Dev Guide',
  'ai-tools-app': 'Top AI Tools to Boost Daily Productivity in 2026',
  'ai-tools-to-make-presentation': 'Best AI Tools to Make Presentations Fast in 2026',
  'ai-tools-website': 'How to Build an AI Tools Website with Next.js',
  'ai-tools-for-graphic-design': 'Best AI Tools for Graphic Design & UI Styling',
  'ai-tools-video-generator': 'Top Free AI Video Generators in 2026',
  'how-to-get-adsense-approval': 'How to Get Google AdSense Approval in 2026',
  'adsense-how-long-to-get-approved': 'How Long Does AdSense Approval Take? (2026 Guide)',
  'how-to-check-my-adsense-account-is-approved': 'How to Check if Your AdSense Account is Approved',
  'when-can-you-get-adsense-on-youtube': 'When Can You Get AdSense on YouTube? YPP Guide',
  'did-not-receive-adsense-payment': 'Did Not Receive AdSense Payment? How to Fix It',
  'ai-tool-hunt': 'AI Tool Hunt: How to Find the Best New AI Tools',
  'count-number-of-words-online': 'Count Number of Words Online: Free Word Counter',
  'free-qr-code-builder': 'Free QR Code Builder: Create Custom Vector QRs',
  'generate-barcode-online': 'Generate Barcode Online: Free 1D & 2D Barcode Maker',
  'remove-image-background-comprehensive-guide': 'Remove Image Background Free: Complete Guide (2026)',
  'premium-pizza-delivery-website-ai-prompt': 'Build a 3D Pizza Delivery App with AI Prompts',
  'faizankishop-management-software-ai': 'FaizanKiShop: Building Shop Management with AI',
  'build-ai-voice-enhancer-tool-faizankiawaz': 'How I Built FaizanKiAwaz: Free AI Voice Enhancer',
  'is-claude-the-best-ai-tool-in-history': 'Is Claude the Best AI Tool in History? An Analysis',
  'ai-vs-humans-who-will-win-in-the-end': 'AI vs Humans: Who Will Win in the End?',
  'top-5-best-free-ai-tools-to-use-in-2026': 'Top 5 Best Free AI Tools to Use in 2026',
  'best-qr-code-generator': 'Finding the Best Free QR Code Generator in 2026',
  'claude-fable-5-is-live-now': 'Claude Fable 5 is Live Now: Features & Capabilities',
  'claude-vs-chatgpt-who-will-win': 'Claude vs ChatGPT: Who Will Win the AI Race?',
  'chatgpt-grok-claude': 'ChatGPT vs Grok vs Claude: Frontier AI Comparison',
  'china-ai-tools-top-100': 'Top 100 New China AI Tools: The 2026 AI Boom',
  'notebooklm-agentic-features': 'NotebookLM Agentic Features & Research Guide',
  'notebooklm-study-hack': 'The Ultimate NotebookLM Study Hack for Students',
  'notebooklm-content-creator-studio': 'NotebookLM for Content Creators: Complete Guide',
  'notebooklm-hallucination-problem': 'How NotebookLM Solves the AI Hallucination Issue',
  'china-free-tool-kimi': 'China Free Tool Kimi: The Rising AI Disruptor',
  'how-to-vibe-code-using-codex': 'How to Vibe Code Using Codex: Complete Guide',
  'claude-fable-5-is-the-most-expensive-tool-yet': 'Claude Fable 5: Is It the Most Expensive AI Tool?',
  'best-ai-for-writing-podcast-show-notes': 'Best AI Tools for Writing Podcast Show Notes',
  'best-free-ai-tool-colorize-old-photos': 'Best Free AI Tools to Colorize Old B&W Photos',
  'best-free-ai-vocal-remover': 'Best Free AI Vocal Removers for Music & Stems',
  'best-free-ai-dnd-character-portraits': 'Best Free AI Tools for D&D Character Portraits',
  'best-ai-script-generator-youtube-shorts': 'Best AI Script Generators for YouTube Shorts',
  'best-free-ai-seamless-texture-generator': 'Best Free AI Seamless Texture Generators for 3D',
  'best-free-ai-interior-design-generator': 'Best Free AI Interior Design Generators (2026)',
  'best-free-ai-workout-plan-generator': 'Best Free AI Workout Plan Generators for Fitness',
  'best-free-ai-presentation-maker': 'Best Free AI Presentation Makers in 2026',
  'best-free-ai-recipe-generator': 'Best Free AI Recipe Generators from Ingredients',
  'best-free-ai-cover-letter-generator': 'Best Free AI Cover Letter Generators to Get Hired',
  'best-free-ai-voice-cloner': 'Best Free AI Voice Cloners for Content Creators'
};

export function getBlogSeoTitle(slug: string, fallbackTitle: string): string {
  if (BLOG_SEO_TITLES[slug]) {
    return BLOG_SEO_TITLES[slug];
  }
  if (fallbackTitle.length <= 60) {
    return fallbackTitle;
  }
  const trimmed = fallbackTitle.slice(0, 57);
  const lastSpace = trimmed.lastIndexOf(' ');
  return (lastSpace > 30 ? trimmed.slice(0, lastSpace) : trimmed) + '...';
}
