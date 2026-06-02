const fs = require('fs');

const files = [
  'src/app/tools/server-status-checker/actions.ts',
  'src/app/tools/www-redirect-checker/actions.ts'
];

for (let file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace literal backslash followed by backtick
    content = content.replace(/\\`/g, '`');
    
    // Replace literal backslash followed by dollar sign
    content = content.replace(/\\\$/g, '$');
    
    // Replace literal backslash followed by asterisk
    content = content.replace(/\\\*/g, '*');
    
    fs.writeFileSync(file, content);
  }
}
console.log('Fixed actions.ts files');
