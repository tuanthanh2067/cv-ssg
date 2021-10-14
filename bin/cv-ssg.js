#!/usr/bin/env node
const chalk = require("chalk");
const { program } = require("commander");

const ReadPath = require("./helpers/readPath");
const ProduceFile = require("./helpers/produceFile");
const ProduceFolder = require("./helpers/produceFolder");

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
  let readPathVar;
  try {
    readPathVar = new ReadPath(path);
  } catch (err) {
    console.log(chalk.yellow(err));
  }
  const readResult = await readPathVar.read();

  const folder = new ProduceFolder();
  const folderPath = folder.getPath();

  if (readPathVar.isFolder()) {
    Promise.all(readResult).then((data) => {
      data.forEach((e) => {
        const file = new ProduceFile(e.results, e.path, e.ext);
        file.produce(styleSheetLink, folderPath);
      });
    });
    return;
  }
  const produceFile = new ProduceFile(
    readResult.results,
    readResult.path,
    readResult.ext
  );
  produceFile.produce(styleSheetLink, folderPath);
};

main();
