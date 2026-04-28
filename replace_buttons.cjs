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
  
  // Replace anything that is an interactive button with bg-slate-900 text-slate-50
  content = content.replace(/bg-slate-900 text-slate-50([^"']*)hover:bg-slate-800/g, 'bg-indigo-600 text-white shadow-md shadow-indigo-200/50 $1hover:bg-indigo-700');
  
  // Mobile nav buttons too
  content = content.replace(/bg-slate-900 text-slate-50 px-5 py-3 font-medium w-full mt-2/g, 'bg-indigo-600 text-white px-5 py-3 font-medium w-full mt-2 shadow-md shadow-indigo-200/50 hover:bg-indigo-700 transition-colors');
  
  fs.writeFileSync(file, content);
});

console.log('remaining buttons updated');
