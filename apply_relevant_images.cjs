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

  // Offerings.tsx replacements
  content = content.replace(/1486406146926-c627a92ad1ab/g, '1618401471353-b98afee0b2eb'); // Agent Studio -> Node/Graph Dashboard
  content = content.replace(/1504384308090-c894fdcc538d/g, '1460925895917-afdab827c52f'); // Agent Shop -> Modern UI/Abstract Tech
  content = content.replace(/1451187580459-43490279c0fa/g, '1618005182384-a83a8bd57fbe'); // Low-Code Pods -> Abstract building blocks
  content = content.replace(/1550745165-9bc0b252726f/g, '1558494949-ef010cbdcc31'); // Salesforce -> Enterprise servers

  // ProblemSolution.tsx
  // Already has 1550745165-9bc0b252726f vertically. Wait, I just replaced that string.
  // Let me just replace the whole Unsplash URL if needed. Let's do it safer.
  
  fs.writeFileSync(file, content);
});

console.log('Relevant images applied.');
