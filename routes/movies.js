const movies = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUserMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { URL_REGEX } = require('../utils/constants');

movies.get('/', getUserMovies);
movies.post('/', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    duration: Joi.number().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEX),
    trailerLink: Joi.string().required().pattern(URL_REGEX),
    thumbnail: Joi.string().required().pattern(URL_REGEX),
    movieId: Joi.number().required(),
  }),
}), createMovie);
movies.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovieById);

module.exports = movies;
