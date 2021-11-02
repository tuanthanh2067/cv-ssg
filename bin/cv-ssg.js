#!/usr/bin/env node

/* global process */

const chalk = require("chalk");
const { program } = require("commander");

const ReadPath = require("./helpers/readPath");
const ProduceFile = require("./helpers/produceFile");
const ProduceFolder = require("./helpers/produceFolder");
const HandleFile = require("./helpers/handleFile");
const CopyFolder = require("./helpers/copyFolder");

program
  .option("-i, --input <type>", "input file or folder")
  .option(
    "-s, --stylesheet <type>",
    "use your custom stylesheet or <default> for default stylesheet"
  )
  .option(
    "-c, --config <type>",
    "input a config.json file containing other options' values"
  )
  .option("-v, --version", "will display current version")
  .option("-h, --help", "will display help for command");

program.parse(process.argv);

const args = program.opts();

const getParams = (args) => {
  // stylesheet option
  let styleSheetLink = "";
  if (args.stylesheet || args.s) {
    // style sheet default option
    if (args.stylesheet === "default" || args.s === "default") {
      styleSheetLink = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";
    } else {
      styleSheetLink = args.styleSheetLink || args.s;
    }
  }

  if (args.config || args.c) {
    // sets option's value based on config file
    return {
      path: args.config || args.c,
      styleSheetLink,
    };
  }

  if (args.version || args.v) {
    console.log(`v${require("../package.json").version}`);
    return process.exit(0);
  }
  if (args.help || args.h) {
    console.log(program.help());
    return process.exit(0);
  }

  if (args.input || args.i) {
    return {
      path: args.input || args.i,
      styleSheetLink,
    };
  }
};

const main = async () => {
  const { path, styleSheetLink } = getParams(args);
  let readPath;
  try {
    readPath = new ReadPath(path);
    await readPath.init();

    let readResult = readPath.getDetails();

    try {
      const handleFile = new HandleFile();
      const returnResult = await handleFile.read(
        readResult.path,
        readResult.ext,
        readPath.results
      );

      const folder = new ProduceFolder();
      const folderPath = folder.getPath();

      // assets available here or null
      // copy assets folder to dist folder
      console.log(returnResult);
      if (returnResult && returnResult.assets) {
        const copyFolder = new CopyFolder(returnResult.assets);
        try {
          await copyFolder.copy("./dist/assets");
        } catch (err) {
          console.log(err);
        }
      }

      if (returnResult.length > 1) {
        Promise.all(returnResult).then((data) => {
          data.forEach((e) => {
            const file = new ProduceFile(
              e.results,
              e.metaData,
              e.path,
              e.ext,
              e.styleSheetLink || styleSheetLink
            );
            file.produce(folderPath);
          });
        });
        return;
      }

      const produceFile = new ProduceFile(
        returnResult.results,
        returnResult.metaData,
        returnResult.path,
        returnResult.ext,
        returnResult.styleSheetLink || styleSheetLink
      );

      produceFile.produce(folderPath);
    } catch (err) {
      console.log(chalk.yellow(err));
    }
  } catch (err) {
    console.log(chalk.yellow(err));
  }
};

main();
