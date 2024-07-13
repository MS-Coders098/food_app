import { getOrders } from "../slices/orderSlice";
import axios from "../../utils/axios";

export const AsyncGetOrder = () => async (dispatch) => {
    const response = await axios.get("/order/admin");
    dispatch(getOrders(response.data));
}