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

  readFile() {
    try {
      return fs.readFile(this.path, "utf-8");
    } catch (err) {
      console.log(require("chalk").yellow("Error occurred while reading file"));
      return process.exit(1);
    }
  }

  readConfigFile() {
    try {
      return fs.readFile(this.path, "utf-8");
    } catch (err) {
      // TODO: check for errors before parsing when giving an invalid file
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
      this.ext = path.extname(file);

      const result = await this.handleFile();
      return {
        results: result,
        path: file,
        ext: this.ext,
      };
    });

    return results;
  }

  async handleFile() {
    let results = await this.readFile();
    let metaData = [];

    if (this.target === ".md") {
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
    results = await this.readConfigFile();
    return JSON.parse(results);
  }

  async read() {
    if (this.target === "folder") {
      const result = await this.handleFolder();
      return result;
    }
    if (this.target === ".txt" || this.target === ".md") {
      const results = await this.handleFile();
      return {
        results: results.results,
        metaData: results.metaData,
        path: this.path,
        ext: this.target,
      };
    }
    if (this.target === ".json") {
      return {
        results: await this.handleJson(),
        path: this.path,
        ext: this.ext,
      };
    }

    throw Error("Wrong file extension");
  }

  isFolder() {
    return this.target === "folder";
  }
};
