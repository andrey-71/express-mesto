const Cards = require('../models/card');

// Получение всех карточек
module.exports.getCards = (req, res) => {
  return Cards.find({})
    .then(cards => {
      if(cards.length === 0) {
        res.status(404).send({message: 'Карточки отсутствуют'});
        return;
      }
      res.status(200).send(cards);
    })
}