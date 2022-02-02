const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR } = require('../utils/errors');
const { JWT_SECRET } = require('../utils/config');

// Регистрация пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password} = req.body;

  bcrypt.hash(password, 10)
    // хэширование пароля
    .then(hash => User.create({ name, about, avatar, email, password: hash, })
    )
    .then(user => res.status(201).send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({message: 'Переданы некорректные данные при создании пользователя'});
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        res.status(CONFLICT).send({message: 'Пользователь с указанным email уже существует'});
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'});
      }
    });
}

// Авторизация пользователя
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      // Создание токена
      const token = jwt.sign(
        { _id: user._id },
        `${JWT_SECRET}`,
        { expiresIn: '7d' }
      );

      // Запись токена в куки
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ data: user.toJSON() });
    })
    .catch(err => {
      res.status(401).send({ message: err.message });
      // if (err.message === 'NotFoundError') {
      //   res.status(NOT_FOUND).send({ message: 'Пользователь с указанным email или паролем не найден' });
      // } else if (err.name === 'ValidationError') {
      //   res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при авторизации пользователя' });
      // } else {
      //   res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      // }
    })
}

// Получение всех пользователей
module.exports.getUsers = (req, res) => User.find({})
  .then(users => {
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
  .then(user => {
    res.status(200).send(user);
  })
  .catch(err => {
    if (err.message === 'NotFoundError') {
      res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при получении пользователя по _id' });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  });

// Получение текущего пользователя
module.exports.getCurrentUser = (req, res) => User.findById(req.user._id)
  .orFail(() => {
    throw new Error('NotFoundError');
  })
  .then(user => {
    res.status(200).send(user);
  })
  .catch(err => {
    if (err.message === 'NotFoundError') {
      res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при получении текущего пользователя' });
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
  .then(user => {
    res.status(200).send(user);
  })
  .catch(err => {
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
  .catch(err => {
    if (err.message === 'NotFoundError') {
      res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
    } else if (err.name === 'ValidationError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    } else {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  });
