const execa = require("execa");

async function run(...args) {
  try {
    const results = await execa.node("../cv-ssg.js", args);
    return results;
  } catch (err) {
    return err;
  }
}

module.exports = run;
