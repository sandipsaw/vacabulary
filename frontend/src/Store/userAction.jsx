import axios from '../Api/axios.config'
import {loaduser} from '../Store/userSlice'

export const asyncRegisterUser = (userData) => async(dispatch,getState)=>{
    try{
        const res = await axios.post('/api/auth/register',userData)
        console.log(res)
        dispatch(loaduser(res.data.user))

    }catch(error){
        console.log(error)
    }
}

export const asyncLoginUser = (userData) => async(dispatch,getState)=>{
    try {
    const res = await axios.post("/api/auth/login", userData);

    dispatch(loaduser(res.data.user))

    return {
      success: true,
      user: res.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login Failed",
    };
  }
}

export const asyncGetUser = () =>async(dispatch,getState)=>{
    try{
        const res = await axios.get('/api/auth/me')
        console.log(res.data); // 👈 ye add karo
        dispatch(loaduser(res.data.user))
    }catch(error){
        console.log(error)
    }
    
}

export const asyncLogOutUser = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/api/auth/logout')
        console.log(res);
        dispatch(loaduser(null))
        
    } catch (error) {
        console.log(error);
    }
}

//vocab section

