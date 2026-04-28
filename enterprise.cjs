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
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Change indigo to enterprise blue
  content = content.replace(/indigo-600/g, 'blue-700');
  content = content.replace(/indigo-700/g, 'blue-800');
  content = content.replace(/indigo-200\/50/g, 'blue-900/10');
  content = content.replace(/indigo-300\/50/g, 'blue-900/20');

  // Make text slightly darker/more contrasted for readability
  content = content.replace(/text-slate-500/g, 'text-slate-600');

  // Make logo boxes a rich corporate blue
  content = content.replace(/bg-slate-900 flex items-center justify-center/g, 'bg-blue-800 flex items-center justify-center rounded-sm');

  // Make buttons explicitly rounded-sm for an enterprise look
  content = content.replace(/bg-blue-700 text-white/g, 'bg-blue-700 text-white rounded-sm');
  
  // Cleanup any potential duplication of rounded-sm if the source already had it
  content = content.replace(/rounded-sm rounded-sm/g, 'rounded-sm');

  fs.writeFileSync(file, content);
});

console.log('Enterprise theme applied.');
