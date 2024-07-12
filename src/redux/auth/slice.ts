import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {signUp, signIn, logOut, getMyInfo} from "./operations";
import {authType} from "../../types/authTypes";

const initialAuth: authType = {
  user: {
    username: "",
    email: "",
    password: "",
    is_admin: false
  },
  access_token: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    loginAuth0(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    refreshUser(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.access_token = action.payload.access_token;
        state.isLoggedIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.access_token = action.payload.access_token;
        state.isLoggedIn = true;
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
        state.user.is_admin = action.payload.is_admin;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.access_token = null;
        state.isLoggedIn = false;
        state.user = {username: "", email: "", password: "", is_admin: false};
      })
  }
});

export  const {refreshUser} = authSlice.actions;
export const {loginAuth0} = authSlice.actions;
export const authReducer = authSlice.reducer;
