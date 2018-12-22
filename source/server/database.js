const debug = require('debug')('Hotto:db');

const pgp = require('pg-promise')({
    error: function (err, e) {
        debug(err.message);
        if (e.cn) {
            debug('There was an error while creating new connection to DB');
        }
    }
});

const db = pgp({
 host: process.env.JYMMAANN_DB_HOST,
    port: process.env.JYMMAANN_DB_PORT,
    database: process.env.JYMMAANN_DB_DATABASE,
    user: process.env.JYMMAANN_DB_USER,
    password: process.env.JYMMAANN_DB_PASSWORD,
    ssl: process.env.JYMMAANN_DB_SSL,


});

db.connect()
    .then(function (obj) {
        obj.done(); // success, release connection;
        console.log("success conected to dtabase")

    })
    .catch(function (error) {
    });

module.exports = db;