import axios from '../Api/axios.config'
import { loadattemptquiz } from './attemptQuizSlice';

export const submitQuiz = (data) => async (dispatch,getState) => {
    try {
        const res = await axios.post("/api/quiz-attempt/submit",data);
        console.log(res)
    } catch (error) {
        dispatch(loadattemptquiz(res.data));
        console.log(error)
    }
};