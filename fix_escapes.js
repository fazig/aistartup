const fs = require('fs');

const files = [
  'src/app/tools/base64-to-image/page.tsx',
  'src/app/tools/class-c-ip-checker/page.tsx',
  'src/app/tools/domain-into-ip/page.tsx',
  'src/app/tools/hex-to-rgb/page.tsx',
  'src/app/tools/open-all-urls/page.tsx',
  'src/app/tools/server-status-checker/page.tsx',
  'src/app/tools/url-rewriting-tool/page.tsx',
  'src/app/tools/www-redirect-checker/page.tsx'
];

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace literal backslash followed by backtick
  content = content.replace(/\\`/g, '`');
  
  // Replace literal backslash followed by dollar sign
  content = content.replace(/\\\$/g, '$');
  
  // Replace literal backslash followed by asterisk
  content = content.replace(/\\\*/g, '*');
  
  fs.writeFileSync(file, content);
}
console.log('Fixed all files');
