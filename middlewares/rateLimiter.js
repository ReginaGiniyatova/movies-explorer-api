const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 200,
  windowsMS: 60 * 1000,
  message: 'Превышен лимит запросов!',
});

module.exports = limiter;
