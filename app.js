const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');

const {PORT = 3000} = process.env;
const app = express();
// Сборка данных в JSON-формат
app.use(bodyParser.json());


// Мидлвэр для временного решения получения И хранения id пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '61ddbe0069dfc16101d36e4b'
  };

  next();
});


// Подключение роутов
app.use(routes);

// Подключение к БД
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


