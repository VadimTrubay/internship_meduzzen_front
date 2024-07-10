import {createSlice} from "@reduxjs/toolkit";
import {register, logIn, logOut, refreshUser} from "./operations";
import {authType} from "../../types/authTypes";


const initialAuth: authType = {
  user: {
    username: "vadnet",
    email: "vadnet@gmail.com",
  },
  token: null,
  toggleLogged: true,
  isLoggedInBase: false,
  isLoggedInAuth0: false,
  isRefreshing: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedInBase = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedInBase = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {username: null, email: null};
        state.token = null;
        state.isLoggedInBase = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedInBase = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
