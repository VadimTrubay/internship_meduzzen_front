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
  // toast.error(action.payload);
};

const handleSignUpFulfilled = (state: initialAuthType, action: PayloadAction<initialAuthType>) => {
  state.loading = false;
  state.error = null;
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
};

const handleSignInFulfilled = (state: initialAuthType, action: PayloadAction<initialAuthType>) => {
  state.loading = false;
  state.error = null;
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
};

const handleGetMeFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.loading = false;
  state.error = null;
  state.isLoggedIn = true;
  state.user.id = action.payload.id;
  state.user.username = action.payload.username;
  state.user.email = action.payload.email;
};

const handleUpdateUsernameFulfilled = (state: initialAuthType, action: PayloadAction<UsernameUpdateType>) => {
  state.loading = false;
  state.error = null;
  state.user.id = action.payload.id;
  state.user.username = action.payload.username;
  toast.success(`Update username successfully`);
};

const handleUpdatePasswordFulfilled = (state: initialAuthType, action: PayloadAction<PasswordUpdateType>) => {
  state.loading = false;
  state.error = null;
  state.user.id = action.payload.id;
  state.user.password = "";
  state.user.new_password = "";
  toast.success(`Update password successfully`);
};

const handleLogOutFulfilled = (state: initialAuthType) => {
  state.loading = false;
  state.error = null;
  state.user = {
    id: "", username: "",
    email: "", password: "",
    new_password: "",
  };
  state.access_token = "";
  state.isLoggedIn = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    setAccessToken(state: initialAuthType, action: PayloadAction<string>) {
      state.access_token = action.payload;
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

export const {setAccessToken} = authSlice.actions;
export const authReducer = authSlice.reducer;
