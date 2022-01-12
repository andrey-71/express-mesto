const User = require('../models/user');

// Получение всех пользователей
module.exports.getUsers = (req, res) => {
  return User.find({})
    .then(users => {
      if(users.length === 0) {
        res.status(404).send({message: 'Пользователи отсутствуют'});
        return;
      }
      res.status(200).send(users);
    })
    .catch(() => res.status(500).send({message: 'На сервере произошла ошибка'}));
};

// Получение пользователя по id
module.exports.getUser = (req, res) => {
  return User.findById(req.params.id)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then(user => {
        res.status(200).send(user);
    })
    .catch(err => {
      if(err.message === 'NotFoundError') {
        res.status(404).send({message: 'Пользователь по указанному _id не найден'});
      } else if (err.name === 'CastError') {
        res.status(400).send({message: 'Переданы некорректные данные при получении пользователя по _id'});
      } else {
        res.status(500).send({message: 'На сервере произошла ошибка'});
      }
    })
};

// Создание нового пользователя
module.exports.createUser = (req, res) => {
  return User.create({...req.body})
    .then(user => res.status(201).send(user))
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при создании пользователя'});
      } else {
        res.status(500).send({message: 'На сервере произошла ошибка'});
      }
    })
};

// Обновление данных пользователя
module.exports.updateUser = (req, res) => {
  return User.findByIdAndUpdate(req.user._id,
    {name: req.body.name, about: req.body.about},
    {new: true, runValidators: true}
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then(user => {
        res.status(200).send(user);
    })
    .catch(err => {
      if(err.message === 'NotFoundError') {
        res.status(404).send({message: 'Пользователь с указанным _id не найден'});
      } else if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'});
      } else {
        res.status(500).send({message: 'На сервере произошла ошибка'});
      }
    })
};

// Обновление аватара пользователя
module.exports.updateAvatar = (req, res) => {
  return User.findByIdAndUpdate(req.user._id,
    {avatar: req.body.avatar},
    {new: true, runValidators: true}
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then(user => {
        res.status(200).send(user);
    })
    .catch(err => {
      if(err.message === 'NotFoundError') {
        res.status(404).send({message: 'Пользователь с указанным _id не найден'});
      } else if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при обновлении аватара'});
      } else {
        res.status(500).send({message: 'На сервере произошла ошибка'});
      }
    })
};

