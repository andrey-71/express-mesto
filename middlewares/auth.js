const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { FORBIDDEN } = require('../utils/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, `${JWT_SECRET}`);
  } catch (err) {
    return res.status(FORBIDDEN).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
}