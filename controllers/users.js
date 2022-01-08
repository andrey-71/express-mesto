const test = require('../test.json'); //del

const getUsers = (req, res) => {
  res.send(test);
}

const getUser = (req, res) => {
  const { id } = req.params;
  const user = test.find(u => u.id === id);

  res.send(user);
}

const createUser = (req, res) => {
  res.status(200).send(req.body);
}

module.exports = {
  getUsers,
  getUser,
  createUser
}