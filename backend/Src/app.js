const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./Routes/authRoutes')
const quizRoutes = require('./Routes/quizRoutes')
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

module.exports = app