module.exports.readFolder = (dir, callback) => {
  require("node-dir").files(dir, (err, files) => {
    if (err) callback(err, null);
    else {
      callback(null, files);
    }
  });
};
