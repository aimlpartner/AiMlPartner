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

  // Replace abstract images with cool tech/sky vibe images
  // For Team.tsx
  content = content.replace(/1555949963-c15da0717b96/g, '1573164713988-8665fc963095'); // Cool modern human
  content = content.replace(/1460925895917-afdab827c52f/g, '1534528741775-53994a69daeb'); // Cool tech human
  content = content.replace(/1504868584819-f81d53cadbc3/g, '1507003211169-0a1dd7228f2d'); // Cool relaxed human
  content = content.replace(/1551288049-bebda4e38f71/g, '1519085360753-af0119f7cbe7'); // Cool human portrait
  
  // For Event / Offerings
  content = content.replace(/1607799279861-4dd964722880/g, '1451187580459-43490279c0fa'); // Sky over city
  content = content.replace(/1461749280684-dccba630e2f6/g, '1486406146926-c627a92ad1ab'); // Tech skyline
  content = content.replace(/1518770660439-4636190af475/g, '1498050108023-c5249f4df085'); // Cloud computing
  content = content.replace(/1550439062-609e1531270e/g, '1504384308090-c894fdcc538d'); // Clean workspace
  content = content.replace(/1504868584819-f81d53cadbc3/g, '1550745165-9bc0b252726f'); // Clean tech room
  
  // Dashboard ProblemSolution / HowWeWork
  // We'll replace 1551288049-bebda4e38f71 (dashboard) -> 1460925895917-afdab827c52f (wait I just used that)
  // Let's use a cool modern office or sky view for the dashboard 1551288049-bebda4e38f71
  // But wait, it's already replaced above.
  
  fs.writeFileSync(file, content);
});

console.log('Creative images updated.');
