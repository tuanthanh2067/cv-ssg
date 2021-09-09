const clear = require("clear");
const args = require("minimist")(process.argv.slice(2));

const { validateExtension, validateString } = require("./helpers/validateFile");
const { readFile } = require("./helpers/readFile");

clear();

const file = args.input || args.i || "";

if (!validateString(file) || !validateExtension(file)) return;

const data = readFile(file);
if (!data) return;
