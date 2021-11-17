const execa = require("execa");

async function run(...args) {
  try {
    const results = await execa.node("./bin/cv-ssg.js", args);
    console.log(results);
    return results;
  } catch (err) {
    return err;
  }
}

module.exports = run;
