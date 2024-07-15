import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {signUp, signIn, logOut, getMe} from "./operations";
import {authType, initialAuthType} from "../../types/authTypes";

const initialAuth: initialAuthType = {
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
    is_admin: false
  },
  access_token: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

const handlePending = (state: initialAuthType) => {
  state.loading = true;
};

const handleRejected = (state: initialAuthType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const handleSignUpFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
  state.loading = false;
};

const handleSignInFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
  state.loading = false;
};

const handleGetMeFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.isLoggedIn = true;
  state.user.id = action.payload.id;
  state.user.username = action.payload.username;
  state.user.email = action.payload.email;
  state.user.password = action.payload.password;
  state.user.is_admin = action.payload.is_admin;
  state.loading = false;
};

const handleLogOutFulfilled = (state: initialAuthType) => {
  state.user = {id: "", username: "", email: "", password: "", is_admin: false};
  state.access_token = null;
  state.isLoggedIn = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    loginAuth0(state: initialAuthType, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, handleSignUpFulfilled)
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, handleSignInFulfilled)
      .addCase(signIn.rejected, handleRejected)
      .addCase(getMe.pending, handlePending)
      .addCase(getMe.fulfilled, handleGetMeFulfilled)
      .addCase(getMe.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(logOut.rejected, handleRejected);
  }
});

export const {loginAuth0} = authSlice.actions;
export const authReducer = authSlice.reducer;
