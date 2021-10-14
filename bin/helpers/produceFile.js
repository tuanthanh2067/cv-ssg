const fs = require("fs");
const chalk = require("chalk");

module.exports = class ProduceFile {
  constructor(results, path, ext) {
    this.results = results;
    this.path = path;
    this.ext = ext;
  }

  createFile(data, styleSheetLink, folder) {
    // read file and return an array of strings
    if (!data) return; // nothing in the array

    // generate dom
    const dom = this.createHtmlFile(data, styleSheetLink);
    try {
      // remove full path first and then extension
      const filename = this.path
        .replace(/^.*[\\\/]/, "")
        .replace(/\.[^/.]+$/, "");

      // write the html to the dist folder
      fs.writeFileSync(`${folder}/${filename}.html`, dom);

      console.log(chalk.yellow("Convert to html successfully"));
    } catch (err) {
      console.log(chalk.yellow("Can not convert file"));
      return process.exit(1);
    }
  }

  //   createFiles(styleSheetLink, folder) {
  //     this.results.forEach((file) => {
  //       this.createFile(file, styleSheetLink, folder);
  //     });
  //   }

  createHtmlFile(data, styleSheetLink) {
    let dom = "";
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
                ${
                  styleSheetLink
                    ? `<link rel='stylesheet' href='${styleSheetLink}'>`
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

  produce(styleSheetLink = "", folder) {
    this.createFile(this.results, styleSheetLink, folder);
  }
};
