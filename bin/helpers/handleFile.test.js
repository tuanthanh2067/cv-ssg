const HandleFile = require("./handleFile");

describe("handleFile class tests", () => {
  describe("handleFile method should work", () => {
    test("should return empty for both attributes", async () => {
      const emptyArrayPromise = new Promise((resolve) => {
        resolve(null);
      });
      const test = new HandleFile();
      expect(test.handleFile("", emptyArrayPromise)).toStrictEqual(
        new Promise((resolve) => {
          resolve({
            results: [],
            metaData: "",
          });
        })
      );
    });

    test("should return correct values for both attributes txt extension", async () => {
      const arrayPromise = new Promise((resolve) => {
        resolve("Hello World");
      });
      const test = new HandleFile();
      expect(test.handleFile(".txt", arrayPromise)).toStrictEqual(
        new Promise((resolve) => {
          resolve({
            results: ["Hello World"],
            metaData: "",
          });
        })
      );
    });

    test("should return correct values for both attributes txt extension", async () => {
      const arrayPromise = new Promise((resolve) => {
        resolve("Hello World");
      });
      const test = new HandleFile();
      expect(test.handleFile(".txt", arrayPromise)).toStrictEqual(
        new Promise((resolve) => {
          resolve({
            results: ["Hello World"],
            metaData: "",
          });
        })
      );
    });

    // test for md extension
  });
});
