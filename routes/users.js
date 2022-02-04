const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar, getCurrentUser,
} = require('../controllers/users');
const {
  userIdValidation,
  userInfoValidation,
  userAvatarValidation,
} = require('../middlewares/joi-validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', userIdValidation, getUser);
router.patch('/me', userInfoValidation, updateUser);
router.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = router;
