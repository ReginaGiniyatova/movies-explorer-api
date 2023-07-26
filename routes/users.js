const users = require('express').Router();

const {
  getUsers,
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');
const { userValidator } = require('../validators/bodyValidator');

users.get('/', getUsers);
users.get('/me', getUserInfo);
users.patch('/me', userValidator, updateUserInfo);

module.exports = users;
