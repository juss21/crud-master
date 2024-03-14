const express = require('express');
const port = 8080; //process.env.INVENTORY_PORT;
const db = require('./queries.js')

const app = express();

app.use(express.json());

app.get('/api/movies', db.getMoviesByTitle)
app.get('/api/movies/:id', db.getMovieById)
app.post('/api/movies/', db.createMovie)
app.put('/api/movies/:id', db.updateMovie)
app.delete('/api/movies/:id', db.deleteMovie)
app.delete('/api/movies', db.deleteAllMovies)

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});