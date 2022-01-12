const Card = require('../models/card');

// Получение всех карточек
module.exports.getCards = (req, res) => {
  return Card.find({})
    .then(cards => {
      if(cards.length === 0) {
        res.status(404).send({message: 'Карточки отсутствуют'});
        return;
      }
      res.status(200).send(cards);
    })
}

// Создание новой карточки
module.exports.createCard = (req, res) => {
  return Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id
  })
    .then(card => res.status(201).send(card))
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные'});
      } else {
        res.status(500).send({message: 'На сервере произошла ошибка'});
      }
    })
}