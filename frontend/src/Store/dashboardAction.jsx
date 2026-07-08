import axios from "../Api/axios.config"
import { loadDashboard } from "../Store/dashboardSlice";

export const getDashboard = () => async (dispatch, getState) => {
    try {

        const res = await axios.get("http://localhost:3000/api/user-progress/dashboard");
        dispatch(loadDashboard(res.data.dashboard));

    } catch (err) {

        console.log(err);

    }
};