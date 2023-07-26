const User = require('../models/user');
const InvalidArgumentError = require('../errors/InvalidArgumentError');
const NotFoundError = require('../errors/NotFoundError');
const {
  USER_NOT_FOUND_MESSAGE,
  INVALID_ARGUMENTS_MESSAGE,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }

      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send(user))
    .catch((error) => (
      error.name === 'ValidationError'
        ? next(new InvalidArgumentError(INVALID_ARGUMENTS_MESSAGE))
        : next(error)
    ));
};

module.exports.getUserInfo = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }

      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    })
    .catch(next);
};
