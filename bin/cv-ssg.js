#!/usr/bin/env node

/* global process */

const chalk = require("chalk");
const yargs = require("yargs");

const ReadPath = require("./helpers/readPath");
const ProduceFile = require("./helpers/produceFile");
const ProduceFolder = require("./helpers/produceFolder");
const HandleFile = require("./helpers/handleFile");
const CopyFolder = require("./helpers/copyFolder");

const argv = yargs
  .usage("$0 <args> [options]")
  .option("input", {
    describe: "input file or folder",
    alias: "i",
    type: "string",
  })
  .option("stylesheet", {
    describe: "use your custom stylesheet or <default> for default stylesheet",
    alias: "s",
    type: "string",
    default: "",
  })
  .option("config", {
    describe: "input a config.json file containing other options' values",
    alias: "c",
    type: "string",
    default: "",
  })
  .alias("v", "version")
  .alias("h", "help")
  .help().argv;

const getParams = (argv) => {
  // stylesheet option
  let styleSheetLink = "";
  if (argv.stylesheet || argv.s) {
    // style sheet default option
    if (argv.stylesheet === "default" || argv.s === "default") {
      styleSheetLink = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";
    } else {
      styleSheetLink = argv.styleSheetLink || argv.s;
    }
  }

  if (argv.config || argv.c) {
    // sets option's value based on config file
    return {
      path: argv.config || argv.c,
      styleSheetLink,
    };
  }

  if (argv.input || argv.i) {
    return {
      path: argv.input || argv.i,
      styleSheetLink,
    };
  }

  yargs.showHelp();
  return process.exit(1);
};

const main = async () => {
  const { path, styleSheetLink } = getParams(argv);
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
