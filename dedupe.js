const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'articles');
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Split the file into lines. We'll reconstruct it.
  const lines = content.split('\n');
  const seenParagraphs = new Set();
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Only dedupe substantial paragraphs (e.g., normal text).
    // Don't dedupe short lines, code blocks, or table rows.
    if (trimmed.length > 50 && !trimmed.startsWith('|') && !trimmed.startsWith('//') && !trimmed.startsWith('import') && !trimmed.startsWith('export')) {
      if (seenParagraphs.has(trimmed)) {
        // Skip adding this line
        continue;
      } else {
        seenParagraphs.add(trimmed);
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }

  const newContent = newLines.join('\n');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Deduped ${file}`);
  }
});
