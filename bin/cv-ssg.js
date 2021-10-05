#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const { program } = require("commander");

const {
  validateExtension,
  validateString,
  validateConfigFile,
} = require("./helpers/validateFile");
const { createFile, createFolder } = require("./helpers/createFile");
const { readFolder } = require("./helpers/readFolder");
const { readConfigFile } = require("./helpers/readConfigFile");

program.version(
  `v${require("../package.json").version}`,
  "-v, --version",
  "will display current version"
);

program
  .option("-i, --input <type>", "input file or folder")
  .option(
    "-s, --stylesheet <type>",
    "use your custom stylesheet or <default> for default stylesheet"
  )
  .option("-c, --config <type>", "specify config.json file");

program.parse(process.argv);

const args = program.opts();

let userInput;

if (args.config || args.c) {
  let file = args.config || args.c;
  if (validateConfigFile(file.trim())) {
    fs.stat(file.trim(), (err) => {
      if (err) {
        console.log(chalk.yellow(`Can not open ${file}`));
        return process.exit(1);
      }
      userInput = readConfigFile(file.trim());
      console.log(userInput.input);
    });
  }
}

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

  // folder input
  fs.stat(file, (err, stat) => {
    if (err) {
      console.log(chalk.yellow(`Can not open ${file}`));
      return process.exit(1);
    }

    const folder = createFolder();

    if (stat && stat.isDirectory()) {
      readFolder(file, (err, results) => {
        if (err) {
          console.log(chalk.yellow(`Can not read ${file}`));
          return process.exit(1);
        }
        results.forEach((file) => {
          createFile(file, stylesheetLink, folder);
        });
      });
    } else {
      // file input
      if (!validateString(file) || !validateExtension(file))
        return process.exit(1);
      createFile(file, stylesheetLink, folder);
    }
    return process.exit(0);
  });
}
