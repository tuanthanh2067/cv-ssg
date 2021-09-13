const clear = require("clear");
const args = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const chalk = require("chalk");

const { validateExtension, validateString } = require("./helpers/validateFile");
const { createFile, createFolder } = require("./helpers/createFile");
const { readFolder } = require("./helpers/readFolder");

// version
if (args.version || args.v) {
  console.log(chalk.green(`v${require("./package.json").version}`));
  return;
}

// help
if (args.help || args.h) {
  console.log("--version || -v        ", "app version");
  console.log("--input || -i          ", "file input");
  console.log("                       ", "it can be either a folder or a file");
  console.log("--stylesheet || -s     ", "style sheet");
  console.log(
    "                       ",
    "-s default will import a random css from internet"
  );
  return;
}

clear();

// stylesheet option
let stylesheetLink;
if (args.stylesheet || args.s) {
  // style sheet default option
  if (args.stylesheet === "default" || args.s === "default") {
    stylesheetLink = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";
  } else {
    stylesheetLink = args.stylesheet || args.s;
    stylesheetLink = stylesheetLink.trim();
  }
}

let file;
if (args.input || args.i) {
  file = args.input || args.i;
  file = file.trim();
}

// folder input
fs.stat(file, (err, stat) => {
  if (err) {
    console.log(chalk.yellow(`Can not open ${file}`));
    return;
  }

  const folder = createFolder();

  if (stat && stat.isDirectory()) {
    readFolder(file, (err, results) => {
      if (err) {
        console.log(chalk.yellow(`Can not read ${file}`));
        return;
      }
      results.forEach((file) => {
        createFile(file, stylesheetLink, folder);
      });
      return;
    });
  } else {
    // file input
    if (!validateString(file) || !validateExtension(file)) return;
    createFile(file, stylesheetLink, folder);
  }
});
