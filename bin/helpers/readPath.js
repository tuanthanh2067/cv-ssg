const fs = require("fs").promises;
const path = require("path");
const dir = require("node-dir");

module.exports = class ReadPath {
  constructor(link) {
    this.path = link;
    this.ext = "";
    this.results = null;

    if (!this.validateString()) {
      throw Error("The path should be a string");
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

  async init() {
    if (path.extname(this.path) === ".txt") {
      this.ext = ".txt";
      this.results = this.readFile();
    } else if (path.extname(this.path) === ".md") {
      this.ext = ".md";
      this.results = this.readFile();
    } else if (path.extname(this.path) === ".json") {
      this.ext = ".json";
      this.results = await JSON.parse(await this.readFile());
    } else if (path.extname(this.path) === "") {
      this.ext = "folder";
      this.results = this.readFolder();
    } else {
      throw Error("Wrong file extension, please try again!");
    }
  }

  readFolder() {
    return dir.promiseFiles(this.path);
  }

  isFolder() {
    return this.ext === "folder";
  }

  getExt() {
    return this.ext;
  }

  getPath() {
    return this.path;
  }

  getResults() {
    return this.results;
  }

  getDetails() {
    return {
      path: this.path,
      ext: this.ext,
      results: this.results,
    };
  }
};
