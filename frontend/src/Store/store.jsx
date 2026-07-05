import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Store/userSlice'
import quizSlice from '../Store/quizSlice'
import vocab from '../Store/vocabSlice'

export const store = configureStore({
    reducer:{
        quizReducers:quizSlice,
        userReducers:userSlice,
        vocab: vocabSlice,
    },
})