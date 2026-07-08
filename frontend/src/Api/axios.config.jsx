import axios from 'axios'

const instance = axios.create({
    baseURL:"https://vacab-backend-i8uw.onrender.com",
    withCredentials:true
})

export default instance