import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedInUserCarts: null,
};

const cartSlice = createSlice({
    name: 'UserCarts',
    initialState,
    reducers: {
        getCarts: (state, action) => {
            state.loggedInUserCarts = action.payload
        },
        removeCart: (state, action) => {
            state.loggedInUserCarts = action.payload
        },
        clearCart: (state, action) => {
            state.loggedInUserCarts = action.payload
        }
    },
});

export const { getCarts, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

