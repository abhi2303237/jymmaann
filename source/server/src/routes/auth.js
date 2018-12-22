const router = require('express').Router();
const validator = require('../middlewares/authMiddleware');
const controller = require('../controllers/authController');

router.post('/login',controller.postSignIn);
router.post('/register',controller.register);
router.post('/verify',validator.validateUser);
module.exports = router;