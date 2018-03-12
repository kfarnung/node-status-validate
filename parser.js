const fs = require('fs');

exports.getTestNames = function * (filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('invalid file path');
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');

  for (const line of lines) {
    const re = /^test-[a-zA-Z0-9-_]+/;
    const result = re.exec(line);
    if (result !== null) {
      yield result[0];
    }
  }
};
