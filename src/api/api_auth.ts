import axios, {AxiosResponse} from "axios";
import {RegisterType, UserAuthorizationType} from "../types/authTypes";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {GetThunkAPI} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";


export const register = async (credentials: RegisterType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.auth.signup, credentials);
};

export const login = async (credentials: UserAuthorizationType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.auth.login, credentials);
};

export const me = async (): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);
  return await axiosInstance.get(mainUrls.auth.me);
};
