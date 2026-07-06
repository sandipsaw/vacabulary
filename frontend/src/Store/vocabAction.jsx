import axios from '../Api/axios.config'
import { loadwords,loadSingleWord } from '../Store/vocabSlice.jsx'


export const asyncCreateWord = (data) => async (dispatch) => {
    try {
      const res = await axios.post("/api/vocab/create", data);
    
      return res.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      console.log(error)
    }
  };

export const asyncGetWords = (letter) => async (dispatch)=>{
  try {
    console.log("letter",letter);
    const res = await axios.get(`/api/vocab/getwords/${letter}`)
    console.log(res.data.words)
    dispatch(loadwords(res.data.words))
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}  

export const asyncGetWordById = (id) => async(dispatch)=>{
  try {
    console.log("id",id);
    const res = await axios.get(`/api/vocab/getSingleWord/${id}`)
    console.log(res.data.word)
    dispatch(loadSingleWord(res.data.word))
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}