const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForBiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// Получение всех карточек
module.exports.getCards = (req, res, next) => Card.find({})
  .then((cards) => {
    res.status(200).send(cards);
  })
  .catch(next);

// Создание новой карточки
module.exports.createCard = (req, res, next) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.user._id,
})
  .then((card) => res.status(201).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  });

// Удаление карточки
module.exports.deleteCard = (req, res, next) => Card.findById(req.params.id)
  .orFail(() => {
    next(new NotFoundError('Карточка с указанным _id не найдена'));
  })
  .then((card) => {
    if (card.owner.toString() === req.user._id) {
      return Card.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).send(card));
    } else {
      next(new ForBiddenError('Вы можете удалить только свою карточку'));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные при удалении карточки'));
    } else {
      next(err);
    }
  });

// Постановка лайка
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Передан несуществующий _id карточки'));
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при постановке лайка'));
      } else {
        next(err);
      }
    });
};

// Снятие лайка
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Передан несуществующий _id карточки'));
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при снятии лайка'));
      } else {
        next(err);
      }
    });
};
