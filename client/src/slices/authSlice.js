import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const token = storedToken ? localStorage.token : null;

const initialState = {
  loading: false,
  token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});


export const { setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
