const run = require("./run");

describe("end-to-end integration", () => {
  test("prints error and help message when no arguments given", async () => {
    const { stderr, stdout, exitCode } = await run();

    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual("");
  });
});
