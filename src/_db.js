const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(require("path").join(__dirname, "../.db"))

function query(query, data) {
    db.run(query, ((res, err) => {
        if (err) return data(false)
        data(res);
    }))
}

module.exports = { query, db }