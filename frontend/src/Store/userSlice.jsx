import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user :[]
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loaduser:(state,action)=>{
            state.user = action.payload
        }
    }
})
export default userSlice.reducers;
export const {loaduser} =  userSlice.actions