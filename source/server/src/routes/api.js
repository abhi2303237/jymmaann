const router = require('express').Router();
const controller = require('../controllers/home')

router.get('/home',controller.getText);
router.use('/auth',require('./auth'));
module.exports = router;