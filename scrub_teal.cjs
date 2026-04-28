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

  // Remove any remaining cyan or teal
  content = content.replace(/cyan-300/g, 'sky-300');
  content = content.replace(/cyan-400/g, 'sky-400');
  content = content.replace(/cyan-500/g, 'sky-500');
  
  content = content.replace(/teal-300/g, 'sky-300');
  content = content.replace(/teal-400/g, 'sky-400');
  content = content.replace(/teal-500/g, 'sky-500');

  // Change the hero image to a known beautiful sky
  content = content.replace(/photo-1513002749550-c59d220818a6/g, 'photo-1495954605963-8a383bb37021');

  // Maybe make the sky gradients a bit more vibrant
  content = content.replace(/bg-gradient-to-br from-white\/90 via-sky-50\/80 to-white\/90/g, 'bg-gradient-to-br from-sky-50/90 via-sky-100/50 to-white/90');
  content = content.replace(/opacity-20 transform scale-105/g, 'opacity-40 transform scale-105'); // make image slightly more visible
  
  fs.writeFileSync(file, content);
});

console.log('Teal and cyan scrubbed completely.');
