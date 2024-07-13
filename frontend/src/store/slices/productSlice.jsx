import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: null,
};

const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload
        }
    },
});

export const { getProducts } = productSlice.actions;
export default productSlice.reducer;

