const fs = require("fs");

module.exports = class ProduceFolder {
  constructor() {
    this.path = `${process.cwd()}/dist`;
    this.createFolder();
  }

  createFolder() {
    this.removeDir();

    // create new dir
    fs.mkdirSync(this.path);
  }

  getPath() {
    return this.path;
  }

  removeDir() {
    // remove dir
    fs.rmdirSync(this.path, { recursive: true });
  }
};
