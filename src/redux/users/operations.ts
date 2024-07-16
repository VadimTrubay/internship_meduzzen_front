import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {editUsername, getUserById, getUsers, removeUserById} from "../../api/api";
import {baseURL} from "../../utils/process_base_url"
import {UsernameUpdateType} from "../../types/usersTypes";


axios.defaults.baseURL = baseURL;

const setAuthHeader = (token) => {
  console.log(token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchUsers = createAsyncThunk(
  "users/",
  async ({ skip, limit}, thunkAPI) => {
    try {
      const response = await getUsers(skip, limit);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/getUsers",
  async (userId: string, thunkAPI) => {
    try {
      const response = await getUserById(userId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const updateUsername = createAsyncThunk(
  "users/editUsername",
  async ({userId, username}: UsernameUpdateType, thunkAPI) => {
    try {
      const res = await editUsername({userId, username});
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, thunkAPI) => {
    try {
      // setAuthHeader(state.access_token);
      const res = await removeUserById(userId);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
