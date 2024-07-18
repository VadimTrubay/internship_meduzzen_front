import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseURL} from "../../utils/process_base_url"
import {PasswordUpdateBackType, UserDeleteType, UsernameUpdateType} from "../../types/authTypes";
import {FetchUsersParams} from "../../types/usersTypes";
import {RootState} from "../store";

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
  any,
  UsernameUpdateType,
  { state: RootState }
>(
  "users/editUsername",
  async ({id, username}: UsernameUpdateType, thunkAPI) => {
    const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to edit user");
    }
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
  any,
  PasswordUpdateBackType,
  { state: RootState }
>(
  "users/editPassword",
  async ({id, password, new_password}: PasswordUpdateBackType, thunkAPI) => {
    const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to edit user");
    }
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
  any,
  UserDeleteType,
  { state: RootState }
>(
  "users/deleteUser",
  async (id: UserDeleteType, thunkAPI) => {
    const state = thunkAPI.getState();
    const access_token = state.auth.access_token;
    if (access_token === null) {
      return thunkAPI.rejectWithValue("Unable to edit user");
    }
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
