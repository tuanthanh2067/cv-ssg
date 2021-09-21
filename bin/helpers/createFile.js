const fs = require("fs");
const chalk = require("chalk");
const { createHtmlFile } = require("./createHtml");
const { readFile } = require("./readFile");

module.exports.createFile = (file, stylesheetLink, folder) => {
  // read file and return an array of strings
  const data = readFile(file);
  if (!data) return; // nothing in the array

  // generate dom
  const dom = createHtmlFile(data, stylesheetLink);
  try {
    // remove full path first and then extension
    const filename = file.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "");

    // write the html to the dist folder
    fs.writeFileSync(`${folder}/${filename}.html`, dom);

    console.log(chalk.yellow("Convert to html successfully"));
  } catch (err) {
    console.log(chalk.yellow("Can not convert file"));
    return process.exit(1);
  }
};

module.exports.createFolder = () => {
  const folder = `${process.cwd()}/dist`;

  // remove dir
  fs.rmdirSync(folder, { recursive: true });

  // create new dir
  fs.mkdirSync(folder);

  return folder;
};
