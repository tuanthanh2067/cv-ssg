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

  test("print error message when wrong file extension is passed using -i", async () => {
    const { stderr, stdout, exitCode } = await run("-i", "invalid.xml");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("print error message when wrong file extension is passed using -c", async () => {
    const { stderr, stdout, exitCode } = await run("-c", "invalid.cpp");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("print error message when provided file does not exist using -i", async () => {
    const { stderr, stdout, exitCode } = await run("-i", "non-existent.txt");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });

  test("print error message when provided file does not exist using -c", async () => {
    const { stderr, stdout, exitCode } = await run("-c", "non-existent.json");

    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual("");
  });
});
