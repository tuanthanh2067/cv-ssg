const showdown = require("showdown");
const path = require("path");
const ReadPath = require("../helpers/readPath");

module.exports = class HandleFile {
  // handle both txt and md
  async handleFile(ext, results) {
    return results.then((r) => {
      let cResults = r;
      let metaData = "";

      if (ext === ".md") {
        const converter = new showdown.Converter({ metadata: true });
        cResults = converter.makeHtml(r);
        metaData = converter.getMetadata();
      }

      return {
        results: cResults
          .split(/\r?\n\r?\n/)
          .map((e) => e.replace(/\r?\n/, " ")),
        metaData,
      };
    });
  }

  async handleJson(results) {
    // results: input, stylesheet, ...
    try {
      const readPath = new ReadPath(results.input);
      await readPath.init();
      const detail = readPath.getDetails();

      return {
        styleSheetLink: results.stylesheet || "",
        data: await this.read(detail.path, detail.ext, detail.results),
        assets: results.assets || null,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async handleFolder(results) {
    return results.then((data) => {
      return data.map(async (file) => {
        const readPath = new ReadPath(file);
        await readPath.init();
        const detail = readPath.getDetails();

        const result = await this.handleFile(detail.ext, detail.results);

        return {
          results: result.results,
          metaData: result.metaData,
          path: file,
          ext: this.target,
        };
      });
    });
  }

  async read(pPath, ext, results) {
    if (ext === "folder") {
      return await this.handleFolder(results);
    }
    if (ext === ".txt" || ext === ".md") {
      const returnResults = await this.handleFile(ext, results);
      return {
        results: returnResults.results,
        metaData: returnResults.metaData,
        path: pPath,
        ext: ext,
      };
    }
    if (ext === ".json") {
      const jsonData = await this.handleJson(results);
      console.log(jsonData, "json data");

      // in case input in config file is a folder
      // which will give back an array of promises
      // set target to folder
      if (jsonData.data.length) {
        ext = "folder";
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
        assets: jsonData.assets,
      };
    }

    throw Error("Wrong file extension");
  }
};
