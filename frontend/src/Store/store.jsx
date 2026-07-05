import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Store/userSlice'
import quizSlice from '../Store/quizSlice'

export const store = configureStore({
    reducer:{
        quizReducers:quizSlice,
        userReducers:userSlice,
    },
})