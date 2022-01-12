const Card = require('../models/card');

// Получение всех карточек
module.exports.getCards = (req, res) => Card.find({})
  .then((cards) => {
    if (cards.length === 0) {
      res.status(404).send({ message: 'Карточки отсутствуют' });
      return;
    }
    res.status(200).send(cards);
  });

// Создание новой карточки
module.exports.createCard = (req, res) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.user._id,
})
  .then((card) => res.status(201).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  });

// Удаление карточки
module.exports.deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .orFail(() => {
    throw new Error('NotFoundError');
  })
  .then((card) => {
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.message === 'NotFoundError') {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
    } else if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные при удалении карточки' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
  });

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
        res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
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
        res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
