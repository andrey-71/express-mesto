const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');

const {PORT = 3000} = process.env;
const app = express();
// Сборка данных в JSON-формат
app.use(bodyParser.json());
// Подключение роутов
app.use(routes);


// Подключение к БД
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


