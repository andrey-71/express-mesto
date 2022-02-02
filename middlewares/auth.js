const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  // console.log(req.headers);
  //
  // if(!authorization || !authorization.startsWith('Bearer ')) {
  //   return res.status(401).send({ message: 'Необходима авторизация' });
  // }
  console.log(req.cookie);
  const token = req.cookie.jwt;
  let payload;

  try {
    payload = jwt.verify(token, `${JWT_SECRET}`);
    req.user = payload;
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  next();
}