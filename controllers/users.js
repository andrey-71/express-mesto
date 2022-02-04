const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { JWT_SECRET } = require('../utils/config');

// Регистрация пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    // хэширование пароля
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user.toJSON()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанным email уже существует'));
      } else {
        next(err);
      }
    });
};

// Авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание токена
      const token = jwt.sign(
        { _id: user._id },
        `${JWT_SECRET}`,
        { expiresIn: '7d' },
      );

      // Запись токена в куки
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ data: user.toJSON() });
    })

    .catch(next);
};

// Получение всех пользователей
module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(next);

// Получение пользователя по id
module.exports.getUser = (req, res, next) => User.findById(req.params.id)
  .orFail(() => {
    next(new NotFoundError('Пользователь по указанному _id не найден'));
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные при получении пользователя по _id'));
    } else {
      next(err);
    }
  });

// Получение текущего пользователя
module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    next(new NotFoundError('Пользователь не найден'));
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch(next);

// Обновление данных пользователя
module.exports.updateUser = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { name: req.body.name, about: req.body.about },
  { new: true, runValidators: true },
)
  .orFail(() => {
    next(new NotFoundError('Пользователь с указанным _id не найден'));
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
  });

// Обновление аватара пользователя
module.exports.updateAvatar = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  { new: true, runValidators: true },
)
  .orFail(() => {
    next(new NotFoundError('Пользователь с указанным _id не найден'));
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
    } else {
      next(err);
    }
  });
