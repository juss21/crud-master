module.exports = app => {

const db = require('./controllers/queries.js')
var router = require("express").Router();

router.get('/', db.getMoviesByTitle)
router.get('/:id', db.getMovieById)
router.post('/', db.createMovie)
router.put('/:id', db.updateMovie)
router.delete('/:id', db.deleteMovie)
router.delete('/', db.deleteAllMovies)

app.use('/api/movies', router)

}