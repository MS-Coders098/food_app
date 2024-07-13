import axios from "../../utils/axios";
import { getCarts, removeCart, clearCart } from "../slices/cartSlice";

export const AsyncGetCart = () => async (dispatch) => {
    const response = await axios.get("/cart");
    dispatch(getCarts(response.data.userCarts));
}

export const AsyncClearCat = (id) => async (dispatch) => {
    const response = await axios.delete("/cart");
    dispatch(clearCart(response.data.allCarts));
}

export const AsyncRemoveCart = (id) => async (dispatch) => {
    const response = await axios.delete(`/cart/${id}`);
    dispatch(removeCart(response.data.allCarts));
}