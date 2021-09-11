const chalk = require("chalk");
const path = require("path");

module.exports.validateString = (file) => {
  if (file === "" || typeof file !== "string") {
    console.log(chalk.yellow("wrong input, please try again"));
    return false;
  }
  return true;
};

module.exports.validateExtension = (file) => {
  if (path.extname(file) !== ".txt") {
    console.log(chalk.yellow("wrong file extension, please try again"));
    return false;
  }
  return true;
};
