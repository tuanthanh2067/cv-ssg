/* global process */
const ProduceFolder = require("./produceFolder");

describe("produceFolder class tests", () => {
  test("get path should return correct path", () => {
    const test = new ProduceFolder();
    expect(test.getPath()).toBe(`${process.cwd()}/dist`);
  });
});
