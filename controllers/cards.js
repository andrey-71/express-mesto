const Card = require('../models/card');
const { BAD_REQUEST, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

// Получение всех карточек
module.exports.getCards = (req, res) => Card.find({})
  .then((cards) => {
    if (cards.length === 0) {
      res.status(NOT_FOUND).send({ message: 'Карточки отсутствуют' });
      return;
    }
    res.status(200).send(cards);
  })
  .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));

// Создание новой карточки
module.exports.createCard = (req, res) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.user._id,
})
  .then((card) => res.status(201).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  });

// Удаление карточки
module.exports.deleteCard = (req, res) => {
  return Card.findById(req.params.id)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((card) => {
      if(card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.status(200).send(card));
      } else {
        throw new Error('ForBiddenError');
      }
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      } else if (err.message === 'ForBiddenError') {
        res.status(FORBIDDEN).send({ message: 'Вы можете удалить только свою карточку' });
      }
      else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при удалении карточки' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

// Постановка лайка
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// Снятие лайка
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
