const express = require('express')
const validator = require('../Middleware/validator.middleware')
const controller = require('../Controller/quiz.controller')

const router = express.Router();

router.post('/createQuiz',validator.createQuizValidation,controller.createQuiz)
router.post('/get',controller.getAllQuizzes)

module.exports = router