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

  // Replace Enterprise Blue with Creative Sky/Cyan Gradients
  content = content.replace(/bg-blue-700 text-white rounded-sm/g, 'bg-gradient-to-r from-sky-400 to-teal-400 text-white rounded-full');
  content = content.replace(/hover:bg-blue-800/g, 'hover:from-sky-500 hover:to-teal-500');
  content = content.replace(/shadow-blue-900\/10/g, 'shadow-sky-500/20');
  content = content.replace(/shadow-blue-900\/20/g, 'shadow-sky-500/40');
  
  // Replace text highlights
  content = content.replace(/text-blue-700 font-semibold/g, 'text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-500 font-semibold');
  
  // Replace dark logo boxes
  content = content.replace(/bg-blue-800 flex items-center/g, 'bg-gradient-to-br from-sky-400 to-teal-500 flex items-center');

  // Any remaining blue-700 or blue-800 (except text highlights caught above)
  content = content.replace(/text-blue-700/g, 'text-teal-500');
  content = content.replace(/group-hover:text-blue-700/g, 'group-hover:text-teal-500');
  content = content.replace(/bg-blue-800/g, 'bg-teal-500');
  content = content.replace(/bg-blue-700/g, 'bg-teal-500');
  
  // Change standard backgrounds to be more dynamic and "sky" like
  // Instead of bg-slate-50 everywhere, let's use some cool gradients
  content = content.replace(/bg-slate-50/g, 'bg-gradient-to-br from-slate-50 to-sky-50/30');
  
  // In index.css, add a creative background? We can leave css alone mostly.
  
  // Dark sections
  content = content.replace(/bg-slate-900/g, 'bg-slate-900'); // Let's keep dark sections but maybe adjust them later

  fs.writeFileSync(file, content);
});

console.log('Creative UI applied.');
