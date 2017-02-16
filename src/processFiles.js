const fs = require('fs');

module.exports = function processFiles(filenames, processor) {
  const errors = {};
  let processed = 0;

  // TODO make it with limits (like not more then 10 files opened at the same time)
  const promises = filenames.map(filename => {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, buff) => {
        if (err) {
          processed++;
          errors[filename] = err;
          resolve();
          return;
        }

        let result;
        try {
          result = processor(buff, filename);
        } catch (err) {
          errors[filename] = err;
          resolve();
          return;
        }

        // if it is a Promise-like object - wait for resolving
        if (result && result.then && typeof result.then === 'function') {
          result.then(resolve).catch((err) => {
            errors[filename] = err;
            resolve();
          });
          return;
        }

        resolve(result);
      });
    });
  });

  return Promise.all(promises).then((results) => {
    return {
      results: results,
      errors: errors
    };
  });
}
