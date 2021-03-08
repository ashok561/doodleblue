const express = require('express');
const router = express.Router();
const {protect } = require('../middleware/auth');
const {register, login, getme } =  require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect,getme);

module.exports = router;