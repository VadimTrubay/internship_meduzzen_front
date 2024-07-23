import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios, {AxiosResponse} from "axios";
import {get_access_token_from_state} from "../utils/get_access_token_from_state";
import {PasswordUpdateBackType, UsernameUpdateType} from "../types/authTypes";


export const getUsers = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axios.get(`/users?skip=${skip}&limit=${limit}`);
};

export const getUserById = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(`/users/${id}`);
};

export const editUserUsername = async (userData: UsernameUpdateType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);
  const {id} = userData;
  return await axios.patch(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const editUserPassword = async (userData: PasswordUpdateBackType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);
  const {id} = userData;
  return await axios.patch(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const removeUser = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const access_token = get_access_token_from_state(thunkAPI);

  return await axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
