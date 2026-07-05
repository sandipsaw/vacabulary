import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    words :[],
    SingleWord:null
}

const vocabSlice = createSlice({
    name:'vocab',
    initialState,
    reducers:{
        loadwords:(state,action)=>{
            state.words = action.payload
            console.log(state.words);
        },
        loadSingleWord:(state,action)=>{
            state.SingleWord = action.payload
            console.log(state.SingleWord);
        }
    }
})
export const {loadwords,loadSingleWord} =  vocabSlice.actions
export default vocabSlice.reducer;