import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    result:null
}

const attemptQuizSlice = createSlice ({
    name:"attemptQuiz",
    initialState,
    reducers:{
        loadattemptquiz:(state,action)=>{
            state.result = action.payload
        }
    }

})

export const {loadattemptquiz} = attemptQuizSlice.actions
export default attemptQuizSlice.reducer