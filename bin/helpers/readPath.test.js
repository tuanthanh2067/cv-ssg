const ReadPath = require("./readPath");

jest.mock("fs");
const fs = require("fs").promises;

describe("readPath class tests", () => {
  test("should throw error if constructor receive invalid link", () => {
    [null, undefined, ""].forEach((option) => {
      expect(() => {
        new ReadPath(option);
      }).toThrow("The path should be a string");
    });
  });

  describe("readFile tests", () => {
    const txtFileData = "Hello World";

    test("Reading txt file should work", async () => {
      const path = "/sample-test.txt";
      fs.__setMockFileData(path, txtFileData);
      const test = new ReadPath(path);
      expect(await test.readFile()).toEqual(txtFileData);
    });
  });

  describe("getter tests", () => {
    const path = "/sample-test.txt";
    fs.__setMockFileData(path, {
      path: "/sample-test.txt",
      ext: ".txt",
      results: new Promise(({ resolve }) => {
        resolve("Hello World");
      }),
    });
    const readPath = new ReadPath(path);

    beforeAll(async () => {
      await readPath.init();
    });

    test("Should return correct extension", () => {
      expect(readPath.getExt()).toBe(".txt");
    });

    test("Should return correct path", () => {
      expect(readPath.getPath()).toBe("/sample-test.txt");
    });

    test("Should return correct results", async () => {
      expect(await readPath.getResults()).toBe("Hello World");
    });

    test("Should return correct details", async () => {
      expect(readPath.getDetails()).toStrictEqual({
        path: "/sample-test.txt",
        ext: ".txt",
        results: new Promise(({ resolve }) => {
          resolve("Hello World");
        }),
      });
    });
  });
});
