const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const { PORT, DB_ADDRESS } = require('./utils/config');

const app = express();
// Сборка данных в JSON-формат
app.use(bodyParser.json());

// Мидлвэр для временного решения хранения id пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '61dea19b6226dd51fcc15da9',
  };

  next();
});

// Подключение роутов
app.use(routes);

// Подключение к БД
mongoose.connect(`${DB_ADDRESS}`, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
