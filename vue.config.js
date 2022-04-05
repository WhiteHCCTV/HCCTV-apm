const path = require("path");

module.exports = {
  publicPath: "/static",
  outputDir: path.resolve(__dirname, "../src/static"),
  indexPath: path.resolve(__dirname, "../src/static/index.html"),
}
