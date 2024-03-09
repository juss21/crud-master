const express = require('express');
const port = 8080; //process.env.INVENTORY_PORT;
const db = require('./queries.js')

const app = express();

app.use(express.json());

// Define routes
app.get('/', db.getMovies)
//app.get('/movies', db.getMovies)
app.get('/movies', db.getMoviesByTitle)
app.get('/movies/:id', db.getMovieById)
app.post('/movies', db.createMovie)
app.put('/movies/:id', db.updateMovie)
app.delete('/movies/:id', db.deleteMovie)

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});