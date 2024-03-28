import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "../services/operations/authAPI";

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

//   extraReducers: (builder) => {
//     // login user
//     builder.addCase(userLogin.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(userLogin.fulfilled, (state, { payload }) => {
//       state.loading = false;
//       state.user = payload.user;
//       state.token = payload.token;
//     });
//     builder.addCase(userLogin.rejected, (state, { payload }) => {
//       state.loading = false;
//       state.error = payload;
//     });
//     // REGISTER user
//     builder.addCase(userRegister.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(userRegister.fulfilled, (state, { payload }) => {
//       state.loading = false;
//       state.user = payload.user;
//     });
//     builder.addCase(userRegister.rejected, (state, { payload }) => {
//       state.loading = false;
//       state.error = payload;
//     });
//     // CURRENT user
//     builder.addCase(getCurrentUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
//       state.loading = false;
//       state.user = payload.user;
//     });
//     builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
//       state.loading = false;
//       state.error = payload;
//     });
//   },
});

// Extracting extra reducers
// export const extraReducers = authSlice.extraReducers;

// Exporting actions and reducer
export const { setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
