// api/_app-scripts.js
const fs = require('fs');
const path = require('path');

module.exports = { getAppScripts };

let _cache = null;
function getAppScripts() {
  if (!_cache) {
    _cache = fs.readFileSync(path.join(__dirname, '_app-scripts-bundle.js'), 'utf8');
  }
  return _cache;
}
