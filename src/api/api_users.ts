import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios, {AxiosResponse} from "axios";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {PasswordUpdateBackType, UsernameUpdateType} from "../types/authTypes";
import {mainUrls} from "../config/urls";


export const getUsers = async (skip: number, limit: number): Promise<AxiosResponse> => {
  return await axios.get(mainUrls.users.all(skip, limit));
};

export const getUserById = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(mainUrls.users.byId(id));
};

export const editUserUsername = async (userData: UsernameUpdateType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  const {id} = userData;

  return await axiosInstance.patch(mainUrls.users.byId(id), userData);
};

export const editUserPassword = async (userData: PasswordUpdateBackType, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  const {id} = userData;

  return await axiosInstance.patch(mainUrls.users.byId(id), userData);
};

export const removeUser = async (id: string, thunkAPI: AsyncThunkConfig): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.delete(mainUrls.users.byId(id));
};
