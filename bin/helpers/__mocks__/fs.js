const fs = jest.createMockFromModule("fs");

// allow adding a mock file with data to our fake file system

const mockFiles = {};
function __setMockFileData(filename, data) {
  mockFiles[filename] = data;
}

function readFile(filepath) {
  const data = mockFiles[filepath];
  if (data) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(new Error("unknown filepath"));
  }
}

fs.promises = {
  __setMockFileData,
  readFile,
};

module.exports = fs;
