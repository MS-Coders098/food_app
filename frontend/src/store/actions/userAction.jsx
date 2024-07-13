import { getUser } from "../slices/fetchUser";
import axios from "../../utils/axios";

export const fetchUserData = () => async (dispatch) => {
    const response = await axios.get("/getuser");
    if (!response.data.user) {
        console.log(response.data)
        return null
    }
    dispatch(getUser(response?.data.user));
}