const express = require('express')
const getWordOfTheDay = require('../Controller/wordoftheDay.controller')

const router = express.Router()

router.get('/get',getWordOfTheDay)

module.exports = router