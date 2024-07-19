import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseURL} from "../../utils/process_base_url"
import {PasswordUpdateBackType, UserDeleteType, UsernameUpdateType} from "../../types/authTypes";
import {FetchUsersParams} from "../../types/usersTypes";
import {RootState} from "../store";
import {get_access_token_from_state} from "../../utils/get_access_token_from_state";

axios.defaults.baseURL = baseURL;


export const fetchUsers = createAsyncThunk(
  "users/",
  async ({skip, limit}: FetchUsersParams, thunkAPI) => {
    try {
      const response = await axios.get(`/users?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/getUsers",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const updateUsername = createAsyncThunk<
  never,
  UsernameUpdateType,
  { state: RootState }
>(
  "users/editUsername",
  async ({id, username}: UsernameUpdateType, thunkAPI) => {
    const access_token = get_access_token_from_state(thunkAPI);
    try {
      const res = await axios.patch(`/users/${id}`, {username}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk<
  never,
  PasswordUpdateBackType,
  { state: RootState }
>(
  "users/editPassword",
  async ({id, password, new_password}: PasswordUpdateBackType, thunkAPI) => {
    const access_token = get_access_token_from_state(thunkAPI);
    try {
      const res = await axios.patch(`/users/${id}`, {password, new_password}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserById = createAsyncThunk<
  never,
  UserDeleteType,
  { state: RootState }
>(
  "users/deleteUser",
  async (id: UserDeleteType, thunkAPI) => {
    const access_token = get_access_token_from_state(thunkAPI);
    try {
      const res = await axios.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
