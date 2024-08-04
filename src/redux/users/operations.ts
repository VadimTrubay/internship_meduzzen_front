import {createAsyncThunk} from '@reduxjs/toolkit';
import {PasswordUpdateBackType, UsernameUpdateType} from '../../types/authTypes';
import {FetchUsersParams} from '../../types/usersTypes';
import {editUserPassword, editUserUsername, getUserById, getUsers, removeUser} from '../../api/api_users';

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({skip, limit}: FetchUsersParams, thunkAPI) => {
    try {
      const response = await getUsers(skip, limit);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
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
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const updateUsername = createAsyncThunk(
  "users/updateUsername",
  async (userData: UsernameUpdateType, thunkAPI) => {
    try {
      const res = await editUserUsername(userData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async (userData: PasswordUpdateBackType, thunkAPI) => {
    try {
      const res = await editUserPassword(userData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, thunkAPI) => {
    try {
      const res = await removeUser(id);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);
