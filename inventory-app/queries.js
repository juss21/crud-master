const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: '192.168.75.66',
    database: 'movies',
    password: '123',
    port: 5432,
})

const getMovies = (request, response) => {
    pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getMovieById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM movies WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createMovie = (request, response) => {
    const {
        title,
        description
    } = request.body
    pool.query('INSERT INTO movies (title, description) VALUES ($1, $2)', [title, description], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`movie added with ID: ${result.insertId}`)
    })
}
const updateMovie = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        title,
        description
    } = request.body
    pool.query(
        'UPDATE movies SET title = $1, description = $2 WHERE id = $3',
        [title, description, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`movie modified with ID: ${id}`)
        }
    )
}
const deleteMovie = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`movie deleted with ID: ${id}`)
    })
}
module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
}