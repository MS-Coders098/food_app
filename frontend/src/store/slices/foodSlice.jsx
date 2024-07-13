import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    foods: null,
};

const foodSlice = createSlice({
    name: 'Foods',
    initialState,
    reducers: {
        getFoods: (state, action) => {
            state.foods = action.payload
        }
    },
});

export const { getFoods } = foodSlice.actions;
export default foodSlice.reducer;

