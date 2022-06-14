const express = require('express');
const router = express.Router();
const { signUp, login, getProfile } = require('../controllers/user');
const verify = require('../middleware/authMiddleware');

router.post('/user/signup', signUp);
router.post('/user/login', login);
router.get('/user/profile', verify, getProfile);

module.exports = router;
