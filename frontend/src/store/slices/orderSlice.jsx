import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: null,
};

const orderSlice = createSlice({
    name: 'Orders',
    initialState,
    reducers: {
        getOrders: (state, action) => {
            state.orders = action.payload
        }
    },
});

export const { getOrders } = orderSlice.actions;
export default orderSlice.reducer;

