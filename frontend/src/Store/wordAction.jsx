import axios from '../Api/axios.config'
import {loadwordoftheDay} from '../Store/wordSlice'

export const asyncGetWordoftheDay = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/word/get");

    console.log(res.data);

    dispatch(loadwordoftheDay(res.data.word));
  } catch (error) {
    console.log(error);
  }
};
