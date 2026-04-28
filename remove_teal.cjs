const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Remove teal and replace with sky equivalents
  content = content.replace(/to-teal-400/g, 'to-sky-600');
  content = content.replace(/to-teal-500/g, 'to-sky-700');
  content = content.replace(/text-teal-500/g, 'text-sky-600');
  content = content.replace(/bg-teal-300/g, 'bg-sky-500');
  content = content.replace(/bg-teal-500/g, 'bg-sky-600');

  // Change some from-sky to from-sky-400 to make the gradient only between sky blues
  content = content.replace(/from-sky-400 to-sky-600/g, 'from-sky-400 to-sky-600');
  
  fs.writeFileSync(file, content);
});

console.log('Teal removed, pure sky blue applied.');
