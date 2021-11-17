const run = require("./run");

describe("end-to-end integration", () => {
  test("prints error and help message when no arguments given", async () => {
    const { stderr, stdout, exitCode } = await run();

    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual("");
  });

  test("print help message when --help option is passed", async () => {
    const { stderr, stdout, exitCode } = await run("--help");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("print version when --version option is passed", async () => {
    const { stderr, stdout, exitCode } = await run("--version");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });
});
