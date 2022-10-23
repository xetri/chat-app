const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  require("path").join(__dirname, "../.db"),
  sqlite3.OPEN_READWRITE
);

module.exports = db;
