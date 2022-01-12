const User = require('../models/user');

// Получение всех пользователей
module.exports.getUsers = (req, res) => {
  return User.find({})
    .then((users) => {
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
    .then((user) => {
      if (!user) {
        res.status(404).send({message: 'Пользователь с таким id не найден'});
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() => res.status(500).send({message: 'На сервере произошла ошибка'}))
};

// Создание нового пользователя
module.exports.createUser = (req, res) => {
  return User.create({...req.body})
    .then(user => res.status(201).send(user))
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные'});
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
    .then(user => {
      if(!user) {
        res.status(404).send({message: 'Пользователь с таким id не найден'});
      } else {
        res.status(200).send(user);
      }
    })
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные'});
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
    .then(user => {
      if(!user) {
        res.status(404).send({message: 'Пользователь с таким id не найден'});
      } else {
        res.status(200).send(user);
      }
    })
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные'});
      } else {
        res.status(500).send({message: 'На сервере произошла ошибка'});
      }
    })
};

