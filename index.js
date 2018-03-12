const fs = require('fs');
const path = require('path');

const parser = require('./parser');
const traversal = require('./traversal');

if (process.argv.length <= 2) {
  console.error('missing parameter');
  process.exit(-1);
}

const statusFilePath = path.resolve(process.argv[2]);
const files = traversal(statusFilePath, /.status$/);

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.error('invalid file path');
    process.exit(-1);
  }

  let printedHeader = false;

  const testPath = path.dirname(filePath);

  for (const file of parser.getTestNames(filePath)) {
    const testFilePath = path.join(testPath, file);
    if (!fs.existsSync(testFilePath + '.js') && !fs.existsSync(testFilePath + '.mjs')) {
      if (!printedHeader) {
        printedHeader = true;
        console.log(`=== ${path.relative(statusFilePath, filePath)} ===`);
      }

      console.log(file);
    }
  }

  if (printedHeader) {
    console.log('');
  }
}
