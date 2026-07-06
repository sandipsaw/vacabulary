import axios from '../Api/axios.config'
import { loadquiz } from './quizSlice'

export const asyncCreateQuiz = (data) => async(dispatch , getState) =>{
    try{
        console.log(data)
        const res = await axios.post('/api/quiz/createQuiz',data)
        console.log(res.data)
        
    }catch(error){
        console.log(error)
    }
}

export const asyncLoadQuiz  = () => async(dispatch,getState)=>{
    try{
        const res = await axios.get('/api/quiz/get')
        console.log(res)
        dispatch(loadquiz(res.data))
    }catch(error){
        console.log(error)
    }
}