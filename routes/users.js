const users = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getUsers,
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getUserInfo);
users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
  }),
}), updateUserInfo);

module.exports = users;
