import axios, {AxiosResponse} from "axios";
import {RegisterType, UserAuthorizationType} from "../types/authTypes";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";


export const register = async (credentials: RegisterType): Promise<AxiosResponse> => {
  return await axios.post("/auth/signup", credentials);
};

export const login = async (credentials: UserAuthorizationType): Promise<AxiosResponse> => {
  return await axios.post("/auth/login", credentials);
};

export const me = async (thunkAPI: GetThunkAPI<AsyncThunkConfig>): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.get('/auth/me');
};