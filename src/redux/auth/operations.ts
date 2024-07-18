import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseURL} from "../../utils/process_base_url"
import {initialAuthType, UsernameUpdateType} from "../../types/authTypes";
import {RootState} from "../store";


axios.defaults.baseURL = baseURL;

export const setAuthHeader = (access_token: string | null) => {
  if (access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
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

export const getMe = createAsyncThunk<
  any,
  UsernameUpdateType,
  { state: RootState }
>(
  'auth/me',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      const response = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
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
      clearAuthHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
