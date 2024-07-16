import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUserById, getUsers} from "../../api/api";


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
  "users/userId",
  async (userId: number, thunkAPI) => {
    try {
      const response = await getUserById(userId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
