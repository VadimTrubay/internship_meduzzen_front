import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseURL} from "../../utils/process_base_url"
import {UsernameUpdateType} from "../../types/authTypes";
import {RootState} from "../store";
import {get_access_token_from_state} from "../../utils/get_access_token_from_state";


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
  never,
  UsernameUpdateType,
  { state: RootState }
>(
  'auth/me',
  async (access_tokenAuth0, thunkAPI) => {
    const access_token = access_tokenAuth0? access_tokenAuth0 : get_access_token_from_state(thunkAPI);
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
