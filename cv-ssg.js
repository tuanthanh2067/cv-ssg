const clear = require("clear");
const args = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const chalk = require("chalk");

const { validateExtension, validateString } = require("./helpers/validateFile");
const { readFile } = require("./helpers/readFile");
const { createHtmlFile } = require("./helpers/createHtml");

// version
if (args.version || args.v) {
  console.log(chalk.green(`v${require("./package.json").version}`));
  return;
}

// help
if (args.help || args.h) {
  console.log("--version || -v", "for version");
  console.log("--input || -i", "file input");
  return;
}

clear();
const file = args.input || args.i || "";

if (!validateString(file) || !validateExtension(file)) return;

// read file and return an array of strings
const data = readFile(file);
if (!data) return; // nothing in the array

// generate dom
const dom = createHtmlFile(data);
try {
  const folder = `${process.cwd()}/dist`;

  // remove dir
  fs.rmdirSync(folder, { recursive: true });

  // create new dir
  fs.mkdirSync(folder);

  // remove extension
  const filename = file.replace(/\.[^/.]+$/, "");

  // write the html to the dist folder
  fs.writeFileSync(`${folder}/${filename}.html`, dom);

  console.log(chalk.yellow("Convert to html successfully"));
} catch (err) {
  console.log(chalk.yellow("Can not convert file"));
}
