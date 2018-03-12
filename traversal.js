const fs = require('fs');
const path = require('path');

function traversal (dir, pattern) {
  const files = [];
  const dirList = fs.readdirSync(dir);
  for (const entry of dirList) {
    const entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      files.push(...traversal(entryPath, pattern));
    } else if (stat.isFile() && pattern.test(entry)) {
      files.push(entryPath);
    }
  }

  return files;
}

module.exports = traversal;
