const fs = require("fs").promises;
const path = require("path");
const dir = require("node-dir");
const showdown = require("showdown");

module.exports = class ReadPath {
  constructor(link) {
    this.path = link;

    if (!this.validateString()) {
      throw Error("The path should be a string");
    }

    if (path.extname(this.path) === ".txt") {
      this.target = ".txt";
    } else if (path.extname(this.path) === ".md") {
      this.target = ".md";
    } else if (path.extname(this.path) === ".json") {
      this.target = ".json";
    } else if (path.extname(this.path) === "") {
      this.target = "folder";
    } else {
      throw Error("Wrong file extension, please try again!");
    }
  }

  validateString() {
    if (this.path === "" || typeof this.path !== "string") {
      return false;
    }
    return true;
  }

  async readFile() {
    try {
      return fs.readFile(this.path, "utf-8");
    } catch (err) {
      console.log(require("chalk").yellow("Error occurred while reading file"));
      return process.exit(1);
    }
  }

  readFolder() {
    return dir.promiseFiles(this.path);
  }

  async handleFolder() {
    const files = await this.readFolder();

    const results = files.map(async (file) => {
      this.path = file;
      this.target = path.extname(this.path);

      const result = await this.handleFile(this.target);
      return {
        results: result.results,
        metaData: result.metaData,
        path: file,
        ext: this.target,
      };
    });

    return results;
  }

  async handleFile(target) {
    let results = await this.readFile();

    let metaData = [];
    console.log(target);
    if (target === ".md") {
      const converter = new showdown.Converter({ metadata: true });
      results = converter.makeHtml(results);
      metaData = converter.getMetadata();
    }

    return {
      results: results.split(/\r?\n\r?\n/).map((e) => e.replace(/\r?\n/, " ")),
      metaData,
    };
  }

  async handleJson() {
    let results = await this.readFile();
    const parsedJson = await JSON.parse(results);

    this.path = parsedJson.input;
    this.target = path.extname(this.path) ? path.extname(this.path) : "folder";

    return {
      styleSheetLink: parsedJson.stylesheet || "",
      data: await this.read(),
    };
  }

  async read() {
    if (this.target === "folder") {
      const results = await this.handleFolder();
      this.target = "folder";
      return results;
    }
    if (this.target === ".txt" || this.target === ".md") {
      const results = await this.handleFile(this.target);
      return {
        results: results.results,
        metaData: results.metaData,
        path: this.path,
        ext: this.target,
      };
    }
    if (this.target === ".json") {
      const jsonData = await this.handleJson();

      // in case input in config file is a folder
      // which will give back an array of promises
      // set target to folder
      if (jsonData.data.length) {
        this.target = "folder";
        // loop through each data of type promise
        // resolve them
        // create an object with that result and styleSheetLink
        //
        return jsonData.data.map((data) => {
          return Promise.resolve(data).then((result) => {
            return {
              ...result,
              styleSheetLink: jsonData.styleSheetLink,
            };
          });
        });
      }

      return {
        results: jsonData.data.results,
        path: jsonData.data.path,
        ext: jsonData.data.ext,
        metaData: jsonData.data.metaData,
        styleSheetLink: jsonData.styleSheetLink,
      };
    }

    throw Error("Wrong file extension");
  }

  isFolder() {
    return this.target === "folder";
  }
};
