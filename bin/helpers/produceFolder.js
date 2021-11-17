/* global process */
const fs = require("fs").promises;

module.exports = class ProduceFolder {
  constructor() {
    this.path = `${process.cwd()}/dist`;
    this.createFolder();
  }

  async createFolder() {
    // remove dir
    await fs.rm(this.path, { recursive: true });

    // create new dir
    await fs.mkdir(this.path);
  }

  getPath() {
    return this.path;
  }
};
