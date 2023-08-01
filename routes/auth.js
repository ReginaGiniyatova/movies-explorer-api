const auth = require('express').Router();

const { createUser, login } = require('../controllers/auth');
const {
  signinValidator,
  signupValidator,
} = require('../validators/bodyValidator');

auth.post('/signin', signinValidator, login);
auth.post('/signup', signupValidator, createUser);

module.exports = auth;
