const router = require('express').Router();
const authRoutes = require('./auth');
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use('/', authRoutes);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
