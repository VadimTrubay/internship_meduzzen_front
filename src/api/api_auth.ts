import axios, {AxiosResponse} from "axios";
import {baseURL} from "../utils/process_base_url";
import {RegisterType, UserAuthorizationType} from "../types/authTypes";
import {createAxiosInstance} from "../utils/createAxiosInstance";
import {GetThunkAPI} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {mainUrls} from "../config/urls";


axios.defaults.baseURL = baseURL;

export const register = async (credentials: RegisterType): Promise<AxiosResponse> => {
  return await axios.post(mainUrls.auth.signup, credentials);
};

export const login = async (credentials: UserAuthorizationType): Promise<AxiosResponse> => {
  return await axios.post(mainUrls.auth.login, credentials);
};

export const me = async (thunkAPI: GetThunkAPI<AsyncThunkConfig>): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(thunkAPI);

  return await axiosInstance.get(mainUrls.auth.me);
};