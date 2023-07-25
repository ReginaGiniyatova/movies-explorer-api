require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const {
  PAGE_NOT_FOUND_MESSAGE,
} = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdbdb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.use('/', authRoutes);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);

app.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE)));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
