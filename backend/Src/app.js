const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./Routes/authRoutes')
const quizRoutes = require('./Routes/quizRoutes')
const vocabRoutes = require('./Routes/VocabRoutes')
const userProgessRoutes = require('./Routes/userProgressRoutes')
const quizAttemptRoutes = require('./Routes/quizAttemptRoutes')
const wordoftheDayRoutes = require('./Routes/wordoftheDayRoutes')

const cors = require('cors')
const connectToDb = require('./Db/db')

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectToDb()
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/vocab',vocabRoutes)
app.use('/api/quiz',quizRoutes)
app.use('/api/user-progress',userProgessRoutes)
app.use('/api/quiz-attempt',quizAttemptRoutes)
app.use('/api/word',wordoftheDayRoutes)


module.exports = app