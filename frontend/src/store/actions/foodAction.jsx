import axios from "../../utils/axios";
import { getFoods } from "../slices/foodSlice";

export const fetchFoods = () => async (dispatch) => {
    const response = await axios.get("/foods")
    dispatch(getFoods(response.data))
}