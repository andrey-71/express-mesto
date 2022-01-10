const User = require('../models/user');

const getUsers = (req, res) => {
  return User.find({})
    .then(users => res.status(200).send(users))
    .catch(() => res.status(500).send({message: 'На сервере произошла ошибка'}));
};

const getUser = (req, res) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({message: 'Пользователь по указанному _id не найден'});
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() => res.status(500).send({message: 'На сервере произошла ошибка'}))
};

const createUser = (req, res) => {
  return User.create({...req.body})
    .then(user => res.status(201).send(user))
    .catch(err => {
      console.log(err);
    })
};

module.exports = {
  getUsers,
  getUser,
  createUser
};