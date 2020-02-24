const assert = require("assert");
const { getFilenames, processFiles } = require("../src/index.js");
const root = __dirname + "/test-dir";
const processed = [];

getFilenames(root, ".js")
  .then(({ files }) => {
    return processFiles(files, (buffer, filename) => {
      assert(~files.indexOf(filename), "filename is not in files list");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          processed.push(filename);
          if (~filename.indexOf("2")) {
            reject("eg. Currupted file");
            return;
          }
          resolve();
        }, 100);
      });
    });
  })
  .then(({ results, errors }) => {
    assert(
      processed.length === 3,
      "processed.length is incorrect",
      processed.length
    );
    assert(
      Object.keys(errors).length === 1,
      "processed.length is incorrect",
      processed.length
    );
    console.log("\x1b[32m%s\x1b[0m%s", "DONE: ", "processFiles");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
