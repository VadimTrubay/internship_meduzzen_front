import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterType, UserAuthorizationType} from "../../types/authTypes";
import {clearAuthHeader, setAuthHeader} from "../../utils/auth_utils";
import {login, me, register} from "../../api/api_auth";



export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials: RegisterType, thunkAPI) => {
    try {
      const response = await register(credentials);
      setAuthHeader(response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: UserAuthorizationType, thunkAPI) => {
    try {
      const response = await login(credentials);
      setAuthHeader(response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, thunkAPI) => {
    try {
      const response = await me(thunkAPI);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      clearAuthHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
