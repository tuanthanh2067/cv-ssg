/* global process */
const fs = require("fs").promises;

module.exports = class ProduceFolder {
  constructor() {
    this.path = `${process.cwd()}/dist`;
  }

  async createFolder() {
    try {
      await fs.mkdir(this.path, { recursive: true });
    } catch (err) {
      console.log(err);
    }
  }

  getPath() {
    return this.path;
  }
};
