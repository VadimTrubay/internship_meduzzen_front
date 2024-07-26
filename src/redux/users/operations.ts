import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseURL} from "../../utils/process_base_url"
import {PasswordUpdateBackType, UsernameUpdateType} from "../../types/authTypes";
import {FetchUsersParams} from "../../types/usersTypes";
import {editUserPassword, editUserUsername, getUserById, getUsers, removeUser} from "../../api/api_users";

axios.defaults.baseURL = baseURL;


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({skip, limit}: FetchUsersParams, thunkAPI) => {
    try {
      const response = await getUsers(skip, limit);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: string, thunkAPI) => {
    try {
      const response = await getUserById(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const updateUsername = createAsyncThunk(
  "users/updateUsername",
  async (userData: UsernameUpdateType, thunkAPI) => {
    try {
      const res = await editUserUsername(userData, thunkAPI);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async (userData: PasswordUpdateBackType, thunkAPI) => {
    try {
      const res = await editUserPassword(userData, thunkAPI);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, thunkAPI) => {
    try {
      const res = await removeUser(id, thunkAPI);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
