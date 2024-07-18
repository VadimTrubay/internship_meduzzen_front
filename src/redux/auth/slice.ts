import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {signUp, signIn, logOut, getMe} from "./operations";
import {authType, initialAuthType, PasswordUpdateType, UsernameUpdateType} from "../../types/authTypes";
import {updatePassword, updateUsername} from "../users/operations";
import toast from "react-hot-toast";

const initialAuth: initialAuthType = {
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
    new_password: "",
    is_admin: false
  },
  access_token: "",
  isLoggedIn: false,
  loading: false,
  error: "",
};

const handlePending = (state: initialAuthType) => {
  state.loading = true;
};

const handleRejected = (state: initialAuthType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(`Error operation`);
};

const handleSignUpFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.loading = false;
  state.error = "";
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
};

const handleSignInFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.loading = false;
  state.error = "";
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
};

const handleGetMeFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.loading = false;
  state.error = "";
  state.isLoggedIn = true;
  state.user.id = action.payload.id;
  state.user.username = action.payload.username;
  state.user.email = action.payload.email;
  state.user.is_admin = action.payload.is_admin;
};

const handleUpdateUsernameFulfilled = (state: initialAuthType, action: PayloadAction<UsernameUpdateType>) => {
  state.loading = false;
  state.error = "";
  state.user.id = action.payload.id;
  state.user.username = action.payload.username;
  toast.success(`Username updated successfully`);
};

const handleUpdatePasswordFulfilled = (state: initialAuthType, action: PayloadAction<PasswordUpdateType>) => {
  state.loading = false;
  state.error = "";
  state.user.id = action.payload.id;
  state.user.password = "";
  state.user.new_password = "";
  toast.success(`Password updated successfully`);
};

const handleLogOutFulfilled = (state: initialAuthType) => {
  state.user = {
    id: "", username: "",
    email: "", password: "",
    new_password: "",
    is_admin: false
  };
  state.access_token = "";
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
      .addCase(updateUsername.pending, handlePending)
      .addCase(updateUsername.fulfilled, handleUpdateUsernameFulfilled)
      .addCase(updateUsername.rejected, handleRejected)
      .addCase(updatePassword.pending, handlePending)
      .addCase(updatePassword.fulfilled, handleUpdatePasswordFulfilled)
      .addCase(updatePassword.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(logOut.rejected, handleRejected);
  }
});

export const {loginAuth0} = authSlice.actions;
export const authReducer = authSlice.reducer;
