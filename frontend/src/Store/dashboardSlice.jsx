import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    dashboard:null
}

const dashboardSlice  = createSlice ({
    name:"dashboard",
    initialState,
    reducers:{
        loadDashboard:(state,action)=>{
            state.dashboard = action.payload
        }
    }

})

export const {loadDashboard} = dashboardSlice.actions
export default dashboardSlice.reducer