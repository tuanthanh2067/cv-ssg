/* global process */
const fs = require("fs");
const chalk = require("chalk");

module.exports = class ProduceFile {
  constructor(results, metaData = null, path, ext, styleSheetLink = "") {
    this.results = results;
    this.metaData = metaData;
    this.path = path;
    this.ext = ext;
    this.styleSheetLink = styleSheetLink;
  }

  createFile(folder) {
    // read file and return an array of strings
    if (!this.results) return; // nothing in the array

    // generate dom
    const dom = this.createHtmlFile(this.results);
    try {
      // remove full path first and then extension
      const filename = this.path
        .replace(/^.*[\\/]/, "")
        .replace(/\.[^/.]+$/, "");

      // write the html to the dist folder
      fs.writeFileSync(`${folder}/${filename}.html`, dom);

      console.log(chalk.yellow("Convert to html successfully"));
    } catch (err) {
      console.log(chalk.yellow("Can not convert file"));
      return process.exit(1);
    }
  }

  createHtmlFile(data) {
    let meta = "";
    let dom = "";

    if (this.metaData) {
      Object.keys(this.metaData).forEach((key) => {
        meta += `<meta name="${key}" content="${this.metaData[key]}"> ${"\n"}`;
      });
    }

    data.forEach((e) => {
      if (e !== "") {
        dom += `<p>${e}</p>`;
      } else {
        dom += "\n\n";
      }
    });
    const result = `
        <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Filename</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${meta}
                ${
                  this.styleSheetLink
                    ? `<link rel='stylesheet' href='${this.styleSheetLink}'>`
                    : ""
                }
            </head>
            <body>
                ${dom}
            </body>
            </html>
    `;

    return result;
  }

  produce(folder) {
    this.createFile(folder);
  }
};
