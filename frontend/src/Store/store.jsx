import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Store/userSlice'
import vocabSlice from '../Store/vocabSlice'

export const store = configureStore({
    reducer:{
        userReducers:userSlice,
        vocab: vocabSlice,
    },
})