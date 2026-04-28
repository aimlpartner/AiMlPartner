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
  
  // Base theme change
  content = content.replace(/stone-/g, 'slate-');
  
  // Specific Button changes
  content = content.replace(/bg-slate-900 text-slate-50 hover:bg-slate-800( transition-colors)?/g, 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50');
  content = content.replace(/bg-slate-900 text-slate-50 px-8 py-4 font-medium hover:bg-slate-800 transition-all/g, 'bg-indigo-600 text-white px-8 py-4 font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50');
  
  // Highlight spans in headings
  content = content.replace(/<span className="text-slate-500">([^<]+)<\/span>/g, '<span className="text-indigo-600 font-semibold">$1</span>');
  
  // Update image IDs for UI representations
  content = content.replace(/1464822759023-fed622ff2c3b/g, '1461749280684-dccba630e2f6'); // Agent Studio -> Code/Software
  content = content.replace(/1436891620584-47fd0e565afb/g, '1550439062-609e1531270e'); // Agent Shop -> Mobile UI
  content = content.replace(/1441974231531-c6227db76b6e/g, '1607799279861-4dd964722880'); // Pods -> Abstract Data/UI
  content = content.replace(/1472214103451-9374bd1c798e/g, '1504868584819-f81d53cadbc3'); // Salesforce -> Metrics/Nodes
  
  content = content.replace(/1501854140801-50d01698950b/g, '1551288049-bebda4e38f71'); // ProblemSolution -> Dashboard
  
  fs.writeFileSync(file, content);
});

console.log('Theme and images updated.');
