const Movie = require('../models/movie');
const InvalidArgumentError = require('../errors/InvalidArgumentError');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');
const {
  INVALID_ARGUMENTS_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  PERMISSION_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getUserMovies = (req, res, next) => {
  const { _id: userId } = req.user;

  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { _id: userId } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch((error) => (
      error.name === 'ValidationError'
        ? next(new InvalidArgumentError(INVALID_ARGUMENTS_MESSAGE))
        : next(error)
    ));
};

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
      }

      const { owner } = movie;

      if (owner.valueOf() !== userId) {
        throw new PermissionError(PERMISSION_ERROR_MESSAGE);
      }

      return movie.deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};
