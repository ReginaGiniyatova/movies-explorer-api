const movies = require('express').Router();

const {
  getUserMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  createMoviesValidator,
  deleteMovieValidator,
} = require('../validators/bodyValidator');

movies.get('/', getUserMovies);
movies.post('/', createMoviesValidator, createMovie);
movies.delete('/:movieId', deleteMovieValidator, deleteMovieById);

module.exports = movies;
