import axios from '../Api/axios.config'
import {loaduser} from '../Store/userSlice'

export const asyncRegisterUser = (userData) => async(dispatch,getState)=>{
    try{
        const res = await axios.post('/api/auth/register',userData)

    }catch(error){
        console.log(error)
    }
}

export const asyncLoginUser = (userData) => async(dispatch,getState)=>{
    try{
        const res = await axios.post('/api/auth/login',userData)

    }catch(error){
        console.log(error)
    }
}

export const asyncGetUser = () =>async(dispatch,getState)=>{
    const res = await axios.get('/api/auth/me')
    if(res){
        dispatch(loaduser(res.data.user))
    }
    else{
        console.log("user not logged in")
    }
}

export const asyncLogOutUser = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/api/auth/logout')
        console.log(res);
        
    } catch (error) {
        console.log(error);
    }
}

//vocab section

