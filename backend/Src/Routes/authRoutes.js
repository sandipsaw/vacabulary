const express = require('express')
const validator = require('../Middleware/validator.middleware')
const authController = require('../Controller/auth.controller');
const authMiddleware = require('../Middleware/auth.middleware');

const router = express.Router();

router.post('/register',validator.registerUserValidation,authController.registerUser)
router.post('/login',validator.loginUserValidation,authController.loginUser)
router.get('/me',authMiddleware.authMiddlewares,authController.getUser)
router.get('/logout',authController.logOutUser)
module.exports = router