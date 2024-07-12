import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseURL} from "../../utils/process_base_url"


axios.defaults.baseURL = baseURL;

const setAuthHeader = (access_token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (credentials: { username: string, email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/signup", credentials);
      setAuthHeader(response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      setAuthHeader(response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMyInfo = createAsyncThunk(
  "auth/user-profile",
  async (credentials: { token: string }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/user-profile", credentials);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout");
      clearAuthHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
