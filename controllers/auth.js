const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserExistsError = require('../errors/UserExistsError');
const {
  USER_EXISTS_MESSAGE,
  SECRET_KEY,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;

      res.send({
        email,
        name,
        _id,
      });
    })
    .catch((error) => (
      error.code === 11000
        ? next(new UserExistsError(USER_EXISTS_MESSAGE))
        : next(error)
    ));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
