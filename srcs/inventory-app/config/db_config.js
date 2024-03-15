const Pool = require('pg').Pool
export const pool = new Pool({
        user: 'admin',
        host: 'localhost',
        database: 'movies',
        password: 'vagrant',
        port: 5321,
});