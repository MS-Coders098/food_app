import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.isLoggedIn = false;
        },
        checkAuth: (state) => {
            const token = localStorage.getItem('token');
            state.isLoggedIn = token;
        },
    },
});

export const { logout, checkAuth, login } = authSlice.actions;
export default authSlice.reducer;

