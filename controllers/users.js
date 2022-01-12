const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

// Получение всех пользователей
module.exports.getUsers = (req, res) => User.find({})
  .then((users) => {
    if (users.length === 0) {
      res.status(NOT_FOUND).send({ message: 'Пользователи отсутствуют' });
      return;
    }
    res.status(200).send(users);
  })
  .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));

// Получение пользователя по id
module.exports.getUser = (req, res) => User.findById(req.params.id)
  .orFail(() => {
    throw new Error('NotFoundError');
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.message === 'NotFoundError') {
      res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при получении пользователя по _id' });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  });

// Создание нового пользователя
module.exports.createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.status(201).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  });

// Обновление данных пользователя
module.exports.updateUser = (req, res) => User.findByIdAndUpdate(
  req.user._id,
  { name: req.body.name, about: req.body.about },
  { new: true, runValidators: true },
)
  .orFail(() => {
    throw new Error('NotFoundError');
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.message === 'NotFoundError') {
      res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
    } else if (err.name === 'ValidationError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  });

// Обновление аватара пользователя
module.exports.updateAvatar = (req, res) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  { new: true, runValidators: true },
)
  .orFail(() => {
    throw new Error('NotFoundError');
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.message === 'NotFoundError') {
      res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
    } else if (err.name === 'ValidationError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  });
