import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Store/userSlice'
import quizSlice from '../Store/quizSlice'
import vocabSlice from '../Store/vocabSlice'
import attemptQuizSlice from '../Store/attemptQuizSlice'
import dashboardSlice from './dashboardSlice'
import wordoftheDaySlice from '../Store/wordSlice'
export const store = configureStore({
    reducer:{
        quizReducers:quizSlice,
        userReducers:userSlice,
        vocabReducers: vocabSlice,
        attemptQuizReducers:attemptQuizSlice,
        dashboardReducers:dashboardSlice,
        wordoftheDayReducers:wordoftheDaySlice
    },
})