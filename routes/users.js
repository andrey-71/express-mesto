const router = require('express').Router();
const {
  // createUser,
  // login,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// router.post('/signin', login);
// router.post('/signup', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
