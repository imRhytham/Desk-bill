const express = require('express');
const router = express.Router();
const { signUp, login, getProfile } = require('../controllers/user');
const { protect } = require('../middleware/authMiddleware');

router.post('/user/signup', signUp);
router.post('/user/login', login);
router.get('/user/profile', protect, getProfile);

module.exports = router;
