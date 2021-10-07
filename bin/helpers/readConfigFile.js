module.exports.readConfigFile = (file) => {
  let results;
  try {
    results = require("fs").readFileSync(file, "utf-8");
    return JSON.parse(results);
  } catch (err) {
    // TODO: check for errors before parsing when giving an invalid file
    console.log(require("chalk").yellow("Error occurred while reading file"));
    return process.exit(1);
  }
};
