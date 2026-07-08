const express = require('express')
const authMiddleware = require('../Middleware/auth.middleware')
const UserDashboard = require('../Controller/userProgress.controller')

const router = express.Router()

router.get('/dashboard',authMiddleware.authMiddlewares,UserDashboard.getUserDashboard)


module.exports = router