const fs = require('fs');
const path = require('path');

const articles = [
  { file: 'claude_fable_5_game_article.md', slug: 'claude-fable-5-game-article', exportName: 'postClaudeFable5GameArticle', category: 'Gaming' },
  { file: 'article_1_watch_world_cup_free.md', slug: 'watch-world-cup-free', exportName: 'postWatchWorldCupFree', category: 'Sports' },
  { file: 'article_2_watch_football_matches_free.md', slug: 'watch-football-matches-free', exportName: 'postWatchFootballMatchesFree', category: 'Sports' },
  { file: 'article_3_who_will_win_world_cup_ai.md', slug: 'who-will-win-world-cup-ai', exportName: 'postWhoWillWinWorldCupAi', category: 'Sports AI' },
  { file: 'article_4_best_apps_stream_fifa_2026.md', slug: 'best-apps-stream-fifa-2026', exportName: 'postBestAppsStreamFifa2026', category: 'Sports' },
  { file: 'article_5_will_messi_win_world_cup.md', slug: 'will-messi-win-world-cup', exportName: 'postWillMessiWinWorldCup', category: 'Sports' }
];

const articlesDir = path.join(__dirname, 'src', 'data', 'articles');
const postsFile = path.join(__dirname, 'src', 'data', 'posts.ts');

let imports = '';
let arrayAdditions = '';

for (const article of articles) {
  if (!fs.existsSync(article.file)) continue;
  
  const content = fs.readFileSync(article.file, 'utf-8');
  
  // Extract title and description from frontmatter
  let title = article.slug.replace(/-/g, ' ');
  let description = '';
  
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  if (titleMatch) title = titleMatch[1];
  
  const descMatch = content.match(/description:\s*"([^"]+)"/);
  if (descMatch) description = descMatch[1];
  
  // Extract main body (remove frontmatter)
  let body = content.replace(/---[\s\S]*?---/, '').trim();
  
  // Escape backticks in body
  body = body.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  
  const tsContent = `import { BlogPost } from '../posts';

export const ${article.exportName}: BlogPost = {
  slug: \`${article.slug}\`,
  title: \`${title}\`,
  description: \`${description}\`,
  date: new Date().toISOString().split('T')[0],
  readTime: \`5 min read\`,
  category: \`${article.category}\`,
  author: \`Faizan\`,
  image: \`/images/football.jpg\`,
  content: \`${body}\`
};
`;

  fs.writeFileSync(path.join(articlesDir, `${article.slug}.ts`), tsContent);
  
  imports += `import { ${article.exportName} } from './articles/${article.slug}';\n`;
  arrayAdditions += `  ${article.exportName},\n`;
}

if (imports.length > 0) {
  let postsContent = fs.readFileSync(postsFile, 'utf-8');
  
  // Add imports before export const BLOG_POSTS
  postsContent = postsContent.replace('export const BLOG_POSTS', imports + '\nexport const BLOG_POSTS');
  
  // Add to array
  postsContent = postsContent.replace('];', arrayAdditions + '];');
  
  fs.writeFileSync(postsFile, postsContent);
  console.log('Successfully integrated articles into blog section.');
} else {
  console.log('No articles found to integrate.');
}
