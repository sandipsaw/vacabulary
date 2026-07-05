const express = require('express')
const validator = require('../Middleware/validator.middleware')
const controller = require('../Controller/quiz.controller')

const router = express.Router();

router.post('/createQuiz',validator.createQuizValidation,controller.createQuiz)

module.exports = router