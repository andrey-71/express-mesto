const { celebrate, Joi } = require('celebrate');

const regexLink = /https?:\/\/(www)?[a-z0-9\S]+\.[a-zа-яё]{2,}[a-z0-9\S]*/;

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.userIdValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexLink),
  }),
});
