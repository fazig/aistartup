const fs = require('fs');
const path = require('path');

const files = [
  "ai-referee-fifa-2026.ts",
  "ai-stadiums-fifa-2026.ts",
  "ai-predictions-fifa-2026.ts",
  "ai-vr-fans-fifa-2026.ts",
  "ai-training-players-fifa-2026.ts"
];

const dir = path.join(__dirname, 'src', 'data', 'articles');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find where content starts. Usually it is `content: ` followed by a backtick or quote.
  const contentIndex = content.indexOf('content:');
  if (contentIndex === -1) return;

  const preContent = content.substring(0, contentIndex + 8); // includes "content:"
  let postContentRaw = content.substring(contentIndex + 8).trim();

  // It might start with a backtick
  if (postContentRaw.startsWith('`')) {
    postContentRaw = postContentRaw.substring(1);
  } else if (postContentRaw.startsWith('"') || postContentRaw.startsWith("'")) {
    postContentRaw = postContentRaw.substring(1);
  }

  // It ends with `};`
  const endMatch = postContentRaw.lastIndexOf('};');
  if (endMatch !== -1) {
    postContentRaw = postContentRaw.substring(0, endMatch).trim();
  }

  // It might end with a backtick before the `};`
  if (postContentRaw.endsWith('`') || postContentRaw.endsWith('"') || postContentRaw.endsWith("'")) {
    postContentRaw = postContentRaw.substring(0, postContentRaw.length - 1);
  }

  // Now postContentRaw is the actual markdown string, but it might have escaped backticks `\\\``
  // Let's unescape them so it's pure markdown.
  postContentRaw = postContentRaw.replace(/\\\\`/g, '`');
  // Also unescape \n if it was double escaped
  // postContentRaw = postContentRaw.replace(/\\\\n/g, '\n');

  // Now we just stringify the raw markdown!
  const safeContent = JSON.stringify(postContentRaw);

  const finalFile = preContent + " " + safeContent + "\n};\n";
  fs.writeFileSync(filePath, finalFile);
  console.log('Fixed', file);
});
