const express = require('express')
const authMiddleware = require('../Middleware/auth.middleware')
const quizAttempt = require('../Controller/quizAttempt.controller')

const router = express.Router()

router.post('/submit',authMiddleware.authMiddlewares,quizAttempt.createQuizAttempt)

module.exports = router
