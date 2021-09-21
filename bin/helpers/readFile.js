module.exports.readFile = (file) => {
  let results;
  try {
    results = require("fs").readFileSync(file, "utf-8");

    return results.split(/\r?\n\r?\n/).map((e) => e.replace(/\r?\n/, " "));
  } catch (err) {
    // TODO: check for errors before parsing when giving an invalid file
    console.log(require("chalk").yellow("Error occurred while reading file"));
    return process.exit(1);
  }
};
