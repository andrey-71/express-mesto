const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send({message: `Ресурс по адресу "${req.path}" не найден`})
});

module.exports = router;