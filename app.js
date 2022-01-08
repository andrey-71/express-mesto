const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
// const mongoose = require('mongoose');

const {PORT = 3000} = process.env;
const test = require('./test.json'); //del


const app = express();
// Сборка данных в JSON-формат
app.use(bodyParser.json());
// Подключение роутов
app.use(routes);

//--refactor
app.get('/users', (req, res) => {
  res.send(test);
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = test.find(u => u.id === id);
  res.send(user);
});

app.post('/users', (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
})
//--


// Подключение к БД
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


