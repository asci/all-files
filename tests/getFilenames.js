const assert = require("assert");
const { getFilenames } = require("../src/index.js");
const root = __dirname + "/test-dir";
const promises = [
  getFilenames(root, /\.js$/i),
  getFilenames(root, ".js"),
  getFilenames(root, f => ~f.indexOf(".js"))
];

Promise.all(promises)
  .then(results => {
    assert(results[0].files[0] === results[1].files[0]);
    assert(results[0].files.length === 3);
    assert(results[0].files.length === results[1].files.length);
    assert(results[0].files.length === results[1].files.length);
    return "";
  })
  .then(
    console.log.bind(console, "\x1b[32m%s\x1b[0m%s", "DONE: ", "getFilenames")
  )
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
