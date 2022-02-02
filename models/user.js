const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error('Пользователь не найден');
      }

      return bcrypt.compare(password, user.password)
        .then(matched => {
          if (!matched) {
            throw new Error('Неправльный email или пароль');
          }

          return user;
        });
    });
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;

  return obj;
}

module.exports = mongoose.model('user', userSchema);
