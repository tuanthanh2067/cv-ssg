const fs = require("fs");
const chalk = require("chalk");

module.exports.readFile = (file) => {
  let results;
  try {
    results = fs.readFileSync(file, "utf-8");

    // parse
    let array = results.split("\r\n");
    return array;
  } catch (err) {
    // TODO: check for errors before parsing when giving an invalid file
    console.log(chalk.yellow("File not found"));
  }
};
