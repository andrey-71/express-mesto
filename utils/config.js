const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET = 'e4d525267573958a5c953cade4b1fc177e26fa56c1c5e1700b6f799abd8668b7',
} = process.env;

module.exports = { PORT, DB_ADDRESS, JWT_SECRET };
