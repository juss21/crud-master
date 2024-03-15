const Pool = require('pg').Pool
module.exports = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'movies',
        password: 'vagrant',
        port: 5432,
});