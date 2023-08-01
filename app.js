require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const {
  PAGE_NOT_FOUND_MESSAGE,
} = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');

const {
  PORT = 3000,
  MONGO_DB_CONNECTION = 'mongodb://127.0.0.1:27017/moviedevdb',
} = process.env;
const app = express();

app.use(cors());
app.use(helmet());

mongoose.connect(MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE)));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
