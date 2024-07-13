import axios from "../../utils/axios";
import { getProducts } from "../slices/productSlice";

export const fetchProducts = () => async (dispatch) => {
    const response = await axios.get("/products")
    dispatch(getProducts(response.data))
}