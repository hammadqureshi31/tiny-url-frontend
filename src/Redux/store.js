import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import urlReducer from "./slices/urlSlice";
import googleLoginReducer from "./slices/googleLogin";

export const store = configureStore({
    reducer: {
        user: userReducer,
        url: urlReducer,
        googleLogin: googleLoginReducer,
    },
});
