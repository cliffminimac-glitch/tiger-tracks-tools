const { getAppScripts } = require("./_app-scripts");
module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Cache-Control", "public, max-age=60");
  res.send(getAppScripts());
};
