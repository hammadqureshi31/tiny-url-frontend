import { createSlice } from "@reduxjs/toolkit";

const googleLoginSlice = createSlice({
    name: "googleLogin",
    initialState: {
        isPending: false,
        isLoggedIn: false,
    }, 
    reducers: {
        signInWithGooglePending: (state) => {
            state.isPending = true;
            localStorage.setItem("googleLogin", true)
        },
        signInWithGoogleDone: (state, action) => {
            state.isPending = false;
            state.isLoggedIn = action.payload;
        }
    }
});

export const { signInWithGoogleDone, signInWithGooglePending } = googleLoginSlice.actions;
export default googleLoginSlice.reducer;