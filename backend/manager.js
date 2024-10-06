const fs = require("fs");

/**
 *
 * @param {fs} fs
 */
module.exports = async (fs) => {
  const dataBaseFiles = fs
    .readdirSync(`${process.cwd()}/backend/database/schemas`)
    .filter((file) => file.endsWith(".js"));

  dataBaseFiles.forEach((files) => {
    files = files.replace(".js", "");
    console.log("Loading " + files);
  });
};