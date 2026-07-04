import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Store/userSlice'

export const store = configureStore({
    reducer:{
        userReducers:userSlice
    },
})