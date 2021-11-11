const ProduceFile = require("./produceFile");
const pretty = require("pretty");

describe("produceFile class tests", () => {
  let results = null;
  let metaData = null;
  let path = "";
  let ext = "";
  let styleSheetLink = "";

  test("should createFile return null if results not available", () => {
    const test = new ProduceFile(results, metaData, path, ext, styleSheetLink);

    expect(test.createFile()).toBe(undefined);
  });

  describe("createHtmlFile should work", () => {
    test("should give correct html file without data, meta and stylesheet", () => {
      let results = [];
      const test = new ProduceFile(
        results,
        metaData,
        path,
        ext,
        styleSheetLink
      );

      expect(test.createHtmlFile(results)).toBe(
        pretty(
          `
        <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Filename</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
            </body>
            </html>
      `,
          { ocd: true }
        )
      );
    });

    test("should give html file without meta and stylesheet", () => {
      let results = ["Hello World"];

      const test = new ProduceFile(
        results,
        metaData,
        path,
        ext,
        styleSheetLink
      );

      expect(test.createHtmlFile(results)).toBe(
        pretty(
          `
        <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Filename</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <p>Hello World</p>
            </body>
            </html>
      `,
          { ocd: true }
        )
      );
    });

    test("should give correct html file with meta and no stylesheet", () => {
      let results = ["Hello World"];

      let metaData = {
        author: "Author",
      };
      const test = new ProduceFile(
        results,
        metaData,
        path,
        ext,
        styleSheetLink
      );

      expect(test.createHtmlFile(results)).toBe(
        pretty(
          `
        <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Filename</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="author" content="Author">
            </head>
            <body>
                <p>Hello World</p>
            </body>
            </html>
      `,
          { ocd: true }
        )
      );
    });

    test("should give correct html file with meta and stylesheet", () => {
      let results = ["Hello World"];

      let metaData = {
        author: "Author",
      };
      styleSheetLink = "test.com";
      const test = new ProduceFile(
        results,
        metaData,
        path,
        ext,
        styleSheetLink
      );

      expect(test.createHtmlFile(results)).toBe(
        pretty(
          `
        <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Filename</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="author" content="Author">
                <link rel='stylesheet' href='test.com'>
            </head>
            <body>
                <p>Hello World</p>
            </body>
            </html>
      `,
          { ocd: true }
        )
      );
    });
  });
});
