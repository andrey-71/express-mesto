const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const { PORT, DB_ADDRESS } = require('./utils/config');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
// Подключение к БД
mongoose.connect(`${DB_ADDRESS}`, {
  useNewUrlParser: true,
});

// Сборка данных в JSON-формат
app.use(bodyParser.json());
// Парсер кук
app.use(cookieParser());

// Роуты регистрации и авторизации (незащищенные)
app.post('/signup', createUser);
app.post('/signin', login);
// Мидлвара авторизации
app.use(auth);
// Остальные роуты (защищенные)
app.use(routes);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
