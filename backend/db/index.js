var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/instagram";
var db = pgp(connectionString);

module.exports = db;
