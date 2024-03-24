import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/auth/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile : profileSlice.reducer,
  },
});

export default store;
