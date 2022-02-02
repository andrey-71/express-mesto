const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const { PORT, DB_ADDRESS } = require('./utils/config');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
// Сборка данных в JSON-формат
app.use(bodyParser.json());

// Роуты регистрации и авторизации (незащищенные)
app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

// Мидлвэр для временного решения хранения id пользователя
// app.use((req, res, next) => {
//   req.user = {
//     _id: '61dea19b6226dd51fcc15da9',
//   };
//
//   next();
// });

// Остальные роуты (защищенные)
app.use(routes);

// Подключение к БД
mongoose.connect(`${DB_ADDRESS}`, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
