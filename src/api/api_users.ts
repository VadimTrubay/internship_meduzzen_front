import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios, {AxiosResponse} from "axios";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {PasswordUpdateBackType, UsernameUpdateType} from "../types/authTypes";


export const getUsers = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axios.get(`/users?skip=${skip}&limit=${limit}`);
};

export const getUserById = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(`/users/${id}`);
};

export const editUserUsername = async (userData: UsernameUpdateType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  const {id} = userData;
  return await axiosInstance.patch(`/users/${id}`, userData);
};

export const editUserPassword = async (userData: PasswordUpdateBackType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  const {id} = userData;
  return await axiosInstance.patch(`/users/${id}`, userData);
};

export const removeUser = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);


  return await axiosInstance.delete(`/users/${id}`);
};
