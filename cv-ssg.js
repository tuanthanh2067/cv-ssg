const clear = require("clear");
const args = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const chalk = require("chalk");

const { validateExtension, validateString } = require("./helpers/validateFile");
const { readFile } = require("./helpers/readFile");

const { createHtmlFile } = require("./helpers/createHtml");

clear();

const file = args.input || args.i || "";

if (!validateString(file) || !validateExtension(file)) return;

const data = readFile(file);
if (!data) return;

const dom = createHtmlFile(data);
try {
  const folder = `${process.cwd()}/dist`;
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const filename = file.replace(/\.[^/.]+$/, "");

  fs.writeFileSync(`${folder}/${filename}.html`, dom);

  console.log(chalk.yellow("Convert to html successfully"));
} catch (err) {
  console.log(chalk.yellow("Can not convert file"));
}
