const fse = require("fs-extra");

module.exports = class CopyFolder {
  constructor(target) {
    this.target = target;
  }

  copy(destination) {
    return fse.copy(this.target, destination);
  }
};
