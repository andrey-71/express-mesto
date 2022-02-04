const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req) => {
  throw new NotFoundError(`Ресурс по адресу "${req.path}" не найден`);
});

module.exports = router;
