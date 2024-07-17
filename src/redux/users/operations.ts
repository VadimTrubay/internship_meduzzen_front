import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {baseURL} from "../../utils/process_base_url"
import {UsernameUpdateType} from "../../types/authTypes";

axios.defaults.baseURL = baseURL;


export const fetchUsers = createAsyncThunk(
  "users/",
  async ({skip, limit}, thunkAPI) => {
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

export const updateUsername = createAsyncThunk(
  "users/editUsername",
  async ({id, username}: UsernameUpdateType, thunkAPI) => {
    const state = thunkAPI.getState();
    // @ts-ignore
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

export const deleteUserById = createAsyncThunk(
  "users/deleteUser",
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState();
    // @ts-ignore
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
