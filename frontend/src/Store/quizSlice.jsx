import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    quizes:[]
}

const quizSlice = createSlice ({
    name:"quiz",
    initialState,
    reducers:{
        loadquiz:(state,action)=>{
            state.quizes = action.payload
        }
    }

})

export const {loadquiz} = quizSlice.actions
export default quizSlice.reducer