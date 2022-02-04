const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  cardInfoValidation,
  cardIdValidation,
} = require('../middlewares/joi-validation');

router.get('/', getCards);
router.post('/', cardInfoValidation, createCard);
router.delete('/:id', cardIdValidation, deleteCard);
router.put('/:id/likes', cardIdValidation, likeCard);
router.delete('/:id/likes', cardIdValidation, dislikeCard);

module.exports = router;
