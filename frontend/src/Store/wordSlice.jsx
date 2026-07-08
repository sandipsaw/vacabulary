import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    wordoftheDay :null
}

const wordoftheDaySlice = createSlice({
    name:'wordoftheDay',
    initialState,
    reducers:{
        loadwordoftheDay:(state,action)=>{
            state.wordoftheDay = action.payload
        }
    }
})
export default wordoftheDaySlice.reducer
export const {loadwordoftheDay} =  wordoftheDaySlice.actions